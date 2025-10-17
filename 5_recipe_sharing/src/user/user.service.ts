import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, username, password } = createUserDto;

        const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });
        if (existingUser) {
            throw new BadRequestException('User with this email or username already exists');
        }

        const user = this.usersRepository.create({ email, username, password });
        return this.usersRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<User | null> {
        const { email, password } = loginUserDto;
        const user = await this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'username', 'password'] });

        if (!user || !user.password) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        delete user.password;
        return user;
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }
}
