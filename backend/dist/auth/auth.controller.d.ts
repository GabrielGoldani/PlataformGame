import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: {
        username: string;
        password: string;
        name: string;
    }): Promise<import("../users/user.schema").User>;
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: string;
    }>;
    getHello(): string;
}
