import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateUserInput {

    @Field(() => String)
    username: string

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string

    @Field(() => String)
    firstName: string

    @Field(() => String)
    lastName: string

}
