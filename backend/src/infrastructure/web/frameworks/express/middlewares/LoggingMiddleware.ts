import { MiddlewareFn } from 'type-graphql';

export const LoggingMiddleware: MiddlewareFn<any> = async (
    { context, info },
    next,
) => {
    console.log(
        `[GraphQL Request] -> ${info.parentType.name}.${info.fieldName}`,
    );
    return next();
};
