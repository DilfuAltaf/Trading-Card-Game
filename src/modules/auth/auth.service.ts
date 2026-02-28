import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { supabase } from '../../config/supabase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  async register(dto: RegisterDto) {
    const { email, password, username } = dto;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      message: 'Register berhasil',
      user: data.user,
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    };
  }
}