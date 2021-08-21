import { hash } from 'bcryptjs'

import { Errors } from '../../lib/enums'
import { prisma } from '../../server'

import type { CreateUserInput } from './types'
import {
    CreateUserPayload,
    UserType,
} from './types'

export class UserService {

    public async create(input: CreateUserInput): Promise<CreateUserPayload> {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: input.email },
                    { username: input.username },
                ],
            },
        })

        if (existingUser) {
            throw new Error(Errors.DUPLICATE_USER)
        }

        const passwordHash = await hash(input.password, 10)

        const user = await prisma.user.create({
            data: {
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                password: passwordHash,
                username: input.username,
            },
        })

        return new CreateUserPayload(user)
    }

    public async findOne(userId: string): Promise<UserType | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return null
        }

        return new UserType(user)
    }

}
