// src/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async register(username: string, password: string, name: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword, name });
        return newUser.save();
    }

    async login(username: string, password: string): Promise<{ accessToken: string; user: string}> {
        const user:User = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user._id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        const name = user.name;
        return { accessToken, user: name};
    }

    private async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username });
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user as User;
        }
        return null;
    }
}
