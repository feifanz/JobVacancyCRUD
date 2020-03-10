import { Controller, Get, Post, Body, Param, Put,Delete ,Query} from '@nestjs/common';
import {UserService} from './user.service'
import {User, UserLoginResponse} from './interfaces/user.interface'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('login')
    async findOne(@Query('username') username: string, @Query('password') password: string): Promise<UserLoginResponse>{
        return this.userService.login(username, password)
    }

}