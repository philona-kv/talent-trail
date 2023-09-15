import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      useGlobalPrefix: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schema/graphql.schema.ts'),
      },
      context: ({ req, res }) => ({
        headers: req.headers,
        cookies: req.cookies,
        res,
        req,
      }),
    }),
  ],
})
export class AppGraphQLModule {}
