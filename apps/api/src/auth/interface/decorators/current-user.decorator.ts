import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GqlCurrentUser Decorator
 *
 * Usage:
 *   @GqlCurrentUser() user: User
 *
 * Holt den aktuellen User aus dem GraphQL-Context (req.user)
 * und kann in jedem Resolver als Parameter verwendet werden.
 */
export const GqlCurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
); 