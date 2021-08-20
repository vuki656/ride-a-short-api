import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../types'

import {
    CreateUserInput,
    CreateUserPayload,
    UserType,
} from './types'
import { UserService } from './User.service'

@Resolver(() => UserType)
export class UserResolver {

    private readonly userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    @Mutation(() => CreateUserPayload)
    public async createUser(
        @Arg('input') input: CreateUserInput,
    ): Promise<CreateUserPayload> {
        return this.userService.create(input)
    }

    @Authorized()
    @Query(() => UserType, { nullable: true })
    public async user(
        @Ctx() context: ContextType,
    ): Promise<UserType | null> {
        return this.userService.findOne(context.userId)
    }

}
