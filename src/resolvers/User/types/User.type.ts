import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class UserType {

    @Field()
    id: string

    @Field()
    username: string

    @Field()
    email: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    password: string

    constructor(user: UserType) {
        this.id = user.id
        this.username = user.username
        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
    }

}
