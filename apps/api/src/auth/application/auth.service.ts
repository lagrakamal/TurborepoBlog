import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from '../../prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../../user/application/dto/create-user.input';
import { AuthJwtPayload } from '../domain/types/auth-jwtPayload';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateLocalUser({ email, password }: SignInInput) {
    this.logger.log('Validating local user', { email });

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      this.logger.warn('User not found during validation', { email });
      throw new UnauthorizedException('User Not Found');
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      this.logger.warn('Invalid credentials during validation', { email });
      throw new UnauthorizedException('Invalid Credentials!');
    }

    this.logger.log('Local user validated successfully', { userId: user.id, email });
    return user;
  }

  async login(user: any) {
    this.logger.log('Processing login', { email: user.email });

    const payload: AuthJwtPayload = {
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    this.logger.log('Login successful', { userId: user.id, email: user.email });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      accessToken,
    };
  }

  async findOrCreateUser(profile: any) {
    this.logger.log('Finding or creating user from profile', { email: profile.email });

    let user = await this.prisma.user.findUnique({
      where: {
        email: profile.email,
      },
    });

    if (!user) {
      this.logger.log('Creating new user from profile', { email: profile.email });

      const createUserInput: CreateUserInput = {
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
        password: 'OAuthNoPassword',
      };

      user = await this.prisma.user.create({
        data: createUserInput,
      });

      this.logger.log('New user created from profile', { userId: user.id, email: user.email });
    } else {
      this.logger.log('Existing user found from profile', { userId: user.id, email: user.email });
    }

    return user;
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException('User not found!');
    return { id: user.id };
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });
    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }
    const dbUser = await this.prisma.user.create({
      data: { ...googleUser },
    });
    const { password, ...authUser } = dbUser;
    return authUser;
  }
}
