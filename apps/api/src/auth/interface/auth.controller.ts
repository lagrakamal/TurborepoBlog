import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { GoogleAuthGuard } from '../infrastructure/guards/google-auth/google-auth.guard';
import { JwtAuthGuard } from '../infrastructure/guards/jwt-auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly configService: ConfigService) { }
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('user:', req.user);

    const userData = await this.authService.login(req.user);
  //  console.log('GoogleCallback userData:', userData); // Debug-Log
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');

    res.redirect(
      `${frontendUrl}/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'ok';
  }
}
