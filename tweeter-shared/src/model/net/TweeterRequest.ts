import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";

export class TweeterRequest { }

export class LogoutRequest extends TweeterRequest {
    authToken: AuthToken;

    constructor(authToken: AuthToken){
        super();
        this.authToken = authToken;
    }
}

export class LoginRequest extends TweeterRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
}

export class RegisterRequest extends TweeterRequest {
    firstName: string;
    lastName: string;
    alias: string;
    password: string;
    userImageBytes: Uint8Array;

    constructor(firstName: string, lastName: string, alias: string, password: string, userImageBytes: Uint8Array) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.alias = alias;
        this.password = password;
        this.userImageBytes = userImageBytes;
    }
}