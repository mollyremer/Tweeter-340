import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import { Status } from "../domain/Status";

export class TweeterRequest { }

export class loadMoreFolloweesRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: User | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null){
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
} 

export class loadMoreFollowersRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: User | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null){
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
} 

export class loadMoreStoryItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: Status | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null){
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
}

export class loadMoreFeedItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: Status | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null){
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
}

export class PostStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    newStatus: Status;

    constructor(authToken: AuthToken, newStatus: Status){
        super();
        this.authToken = authToken;
        this.newStatus = newStatus;
    }
}

export class GetFollowerCountRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User){
        super();
        this.authToken = authToken;
        this.user = user;
    }
}

export class GetFolloweesCountRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User){
        super();
        this.authToken = authToken;
        this.user = user;
    }
}

export class GetIsFollowerStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    selectedUser: User;

    constructor(authToken: AuthToken, user: User, selectedUser: User){
        super();
        this.authToken = authToken;
        this.user = user;
        this.selectedUser = selectedUser;
    }
}

export class GetUserRequest extends TweeterRequest {
    authToken: AuthToken;
    alias: string;

    constructor(authToken: AuthToken, alias: string){
        super();
        this.authToken = authToken;
        this.alias = alias;
    }
}

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