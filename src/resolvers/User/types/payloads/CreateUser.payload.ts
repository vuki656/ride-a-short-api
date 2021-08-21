import {
    Field,
    ObjectType,
} from 'type-graphql'

import { UserType } from '../User.type'

@ObjectType()
export class CreateUserPayload {

    @Field(() => UserType)
    user: UserType

    constructor(user: UserType) {
        this.user = user
    }

}
