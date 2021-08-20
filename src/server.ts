import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'

import { getUserIdFromToken } from './lib'
import { getSchema } from './server/schema'
import type { ContextType } from './types'

const SECRET = process.env.JWT_SECRET as string
const isDevelopment = process.env.NODE_ENV !== 'production'

export const server = new ApolloServer({
    context: ({ req }) => {
        const tokenPayload = req.headers.token as string ?? ''

        return {
            secret: SECRET,
            tokenPayload: tokenPayload,
            userId: getUserIdFromToken(tokenPayload),
        } as ContextType
    },
    introspection: isDevelopment,
    plugins: [
        isDevelopment
            ? ApolloServerPluginLandingPageGraphQLPlayground()
            : ApolloServerPluginLandingPageDisabled(),
    ],
    schema: getSchema(),
})

void server
    .listen({ port: 8080 })
    .then(({ url }) => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at ${url}`)

        // NOTE: Used in pipeline to check if server can be started/everything correctly setup
        if (process.env.KILL) {
            void server.stop()
        }
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('=================== ERROR ===================')
        // eslint-disable-next-line no-console
        console.log(error)
    })

export const prisma = new PrismaClient()
