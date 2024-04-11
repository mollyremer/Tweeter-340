import { AuthToken, Follow, Status, User } from "tweeter-shared";
import { DataPage } from "./DataPage";

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
    getPage(alias: string, pageSize: number): Promise<DataPage<Status>>
}

export interface UserDAOInterface {
    put(user: User, password: string): Promise<void>;
    getUser(alias: string): Promise<User | null>;
    getPassword(alias: string): Promise<string | null>;
    getFollowerCount(alias: string): Promise<number>;
    getFolloweeCount(alias: string): Promise<number>;
    updateFollowerCount(alias: string, update: number): Promise<void>;
    updateFolloweeCount(alias: string, update: number): Promise<void>;
}

export interface FollowsDAOInterface {
    put(follow: Follow): Promise<void>;
    update(follow: Follow): Promise<void>;
    delete(follow: Follow): Promise<void>
    get(follow: Follow): Promise<Follow | undefined>
    getPageOfFollowees(followerHandle: string, pageSize: number, lastFolloweeHandle: string | undefined): Promise<DataPage<User>>;
    getPageOfFollowers(followeeHandle: string, pageSize: number, lastFollowerHandle: string | undefined): Promise<DataPage<User>>;
}