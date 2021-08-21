import { registerEnumType } from 'type-graphql'

export enum Errors {
    DUPLICATE_USER = 'User alerady exists'
}

registerEnumType(Errors, {
    description: 'All the custom errors the API can throw',
    name: 'Errors',
})
