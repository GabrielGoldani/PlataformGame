// src/auth.controller.ts
import {Controller, Post, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: { username: string; password: string; name: string }) {
        return this.authService.register(createUserDto.username, createUserDto.password, createUserDto.name);
    }

    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        return this.authService.login(loginDto.username, loginDto.password);
    }
    @Get()
    getHello(): string {
        return "Hello World!"
    }
}
