import express from 'express';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { GraphQLSchema } from 'graphql';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServer } from '@apollo/server';
import http from 'http';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebFramework } from '@infrastructure/web/interfaces/WebFramework';
import { CharacterResolver } from '@infrastructure/web/frameworks/graphql/resolvers/CharacterResolver';

export class Express implements WebFramework {
    private app: express.Application;
    private apolloServer!: ApolloServer;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
    }

    private setUpRoutes() {
        this.app.use('/graphql', expressMiddleware(this.apolloServer));
    }

    private async setUpGraphQLSchema() {
        return await buildSchema({
            resolvers: [CharacterResolver],
            emitSchemaFile: path.resolve(
                __dirname,
                '../graphql/schema.graphql',
            ),
        });
    }

    private async setUpGraphQLServer(schema: GraphQLSchema) {
        this.apolloServer = new ApolloServer({
            plugins: [
                ApolloServerPluginDrainHttpServer({
                    httpServer: this.httpServer,
                }),
            ],
            schema,
        });

        await this.apolloServer.start();
    }

    async start(): Promise<void> {
        const shcema = await this.setUpGraphQLSchema();
        await this.setUpGraphQLServer(shcema);
        this.setUpRoutes();
        await new Promise<void>((resolve) => {
            this.httpServer.listen({ port: 3000 }, resolve);
        });
    }
}
