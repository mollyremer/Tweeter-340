import { AuthToken, Follow, Status, User } from "tweeter-shared";
import { DataPage } from "./DataPage";

export interface AuthDAOInterface {
    put(password: string): Promise<void>;
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
    get(alias: string): Promise<User | undefined>;
}

export interface FollowsDAOInterface {
    put(follow: Follow): Promise<void>;
    update(follow: Follow): Promise<void>;
    delete(follow: Follow): Promise<void>
    get(follow: Follow): Promise<Follow | undefined>
    getPageOfFollowees(followerHandle: string, pageSize: number, lastFolloweeHandle: string | undefined): Promise<DataPage<Follow>>;
    getPageOfFollowers(followeeHandle: string, pageSize: number, lastFollowerHandle: string | undefined): Promise<DataPage<Follow>>;
}