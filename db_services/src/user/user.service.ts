import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserLoginResponse} from './interfaces/user.interface'


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findByUsername(username: String): Promise<User> {
    return this.UserModel.findOne({'username':username})
  }
  async login(username: String, password: String): Promise<UserLoginResponse> {
    const userObj = await this.findByUsername(username)
    if(!userObj || userObj.password != password){
        throw new HttpException('login failed', HttpStatus.UNAUTHORIZED);
    }

    let response:UserLoginResponse = {
            name:userObj.name, 
            role:userObj.role, 
            customerId:userObj.customerId
        }
   
    return response

  }
}
