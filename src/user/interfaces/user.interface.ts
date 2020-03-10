import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: String;
    readonly username: String;
    readonly password: String;
    readonly role: String;
    readonly customerId: String;
}

export interface UserLoginResponse {
    readonly name: String;
    readonly role: String;
    readonly customerId: String;
}