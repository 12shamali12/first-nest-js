import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { authCredentialDto } from './DTO/auth-credential.dto';
import { AuthService } from './auth.service';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  

  @Post('/signup')
  signUp(@Body() authCredentialDto: authCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }
  @Post('/signin')
  signIn(@Body() authCredentialDto: authCredentialDto): Promise<string> {
    return this.authService.signIn(authCredentialDto);
  }
}


