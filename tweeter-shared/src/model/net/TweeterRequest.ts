import { User } from "../domain/User";

export class TweeterRequest{}

export class LoginRequest extends TweeterRequest{
    username: string;
    password: string;

    constructor(username: string, password: string){
        super();
        this.username = username;
        this.password = password;
    }
}