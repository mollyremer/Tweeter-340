import { AuthToken, Follow, Status, User } from "tweeter-shared";
import { DataPage } from "./DataPage";

export interface ImageDAOInterface {
    putImage(fileName: string, imageStringBase64Encoded: string): Promise<string>;
}

export interface AuthDAOInterface {
    put(alias: string, password: string): Promise<AuthToken>;
    get(token: string): Promise<AuthToken | undefined>;
    delete(token: string): Promise<void>;
}

export interface StatusDAOInterface {
    put(status: Status, alias: string): Promise<void>;
    update(status: Status, alias: string): Promise<void>;
    delete(status: Status, alias: string): Promise<void>;
    get(status: Status, alias: string): Promise<Status | undefined>;
    getPage(alias: string, pageSize: number, lastItem: Status | null): Promise<DataPage<Status>>
}

export interface UserDAOInterface {
    put(user: User, password: string): Promise<void>;
    getUser(alias: string): Promise<User | null>;
    getPassword(alias: string): Promise<string | null>;
    getSalt(alias: string): Promise<string | null>;
    getFollowerCount(alias: string): Promise<number>;
    getFolloweeCount(alias: string): Promise<number>;
    updateFollowerCount(alias: string, update: number): Promise<number>;
    updateFolloweeCount(alias: string, update: number): Promise<number>;
}

export interface FollowsDAOInterface {
    put(follow: Follow): Promise<void>;
    update(follow: Follow): Promise<void>;
    delete(follow: Follow): Promise<void>
    get(follow: Follow): Promise<Follow | null>
    getPageOfFollowees(followerHandle: string, pageSize: number, lastFolloweeHandle: string | null): Promise<DataPage<User>>;
    getPageOfFollowers(followeeHandle: string, pageSize: number, lastFollowerHandle: string | null): Promise<DataPage<User>>;
}