import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserResolver } from './interface/user.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { UserPrismaRepository } from './infrastructure/prisma/user.prisma.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { CreateUserUseCaseProvider } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCaseProvider } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCaseProvider } from './application/use-cases/delete-user.use-case';
import { GetUserUseCaseProvider } from './application/use-cases/get-user.use-case';
import { ListUsersUseCaseProvider } from './application/use-cases/list-users.use-case';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    UserPrismaRepository,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    CreateUserUseCaseProvider,
    UpdateUserUseCaseProvider,
    DeleteUserUseCaseProvider,
    GetUserUseCaseProvider,
    ListUsersUseCaseProvider,
  ],
})
export class UserModule { }
