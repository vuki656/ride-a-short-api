import { AuthenticationError } from 'apollo-server'
import { hash } from 'bcryptjs'
import {
    decode,
    verify,
} from 'jsonwebtoken'

import { prisma } from '../../server'
import type {
    ContextType,
    DecodedTokenType,
} from '../../types'

import type { CreateUserInput } from './types'
import {
    CreateUserPayload,
    UserType,
    VerifyUserPayload,
} from './types'

export class UserService {

    public async create(input: CreateUserInput): Promise<CreateUserPayload> {
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

    public async verify(context: ContextType): Promise<VerifyUserPayload> {
        const { secret, tokenPayload } = context

        const [, token] = tokenPayload.split(' ')

        const decodedToken = decode(token) as DecodedTokenType

        if (!decodedToken) {
            return new VerifyUserPayload(false)
        }

        const userExists = Boolean(
            await prisma.user.findUnique({
                where: {
                    id: decodedToken.userId,
                },
            })
        )

        if (!userExists) {
            return new VerifyUserPayload(false)
        }

        if (!token) {
            return new VerifyUserPayload(false)
        }

        verify(token, secret, (error) => {
            if (error) throw new AuthenticationError('Authentication Failed')
        })

        return new VerifyUserPayload(true)
    }

}
