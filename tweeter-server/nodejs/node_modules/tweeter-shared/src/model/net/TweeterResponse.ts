import { AuthToken } from "../domain/AuthToken";
import { Status } from "../domain/Status";
import { User } from "../domain/User";

interface ResponseJson {
  _success: boolean;
  _message: string;
}

export class TweeterResponse {
  private _success: boolean;
  private _message: string | null;

  constructor(success: boolean, message: string | null = null) {
    this._success = success;
    this._message = message;
  }

  get success() {
    return this._success;
  }

  get message() {
    return this._message;
  }

  static fromJson(json: JSON): TweeterResponse {
    interface TweeterResponseJson extends ResponseJson {
      _user: JSON;
      _token: JSON;
    }

    const jsonObject: TweeterResponseJson =
      json as unknown as TweeterResponseJson;

    return new TweeterResponse(
      jsonObject._success,
      jsonObject._message
    );
  }
}

export class FollowToggleResponse extends TweeterResponse {
  private _followersCount: number;
  private _followeesCount: number;

  constructor(
    followersCount: number,
    followeesCount: number,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._followeesCount = followeesCount;
    this._followersCount = followersCount
  }

  get followersCount() {
    return this._followeesCount;
  }

  get followeesCount() {
    return this._followersCount;
  }

  static fromJson(json: JSON): FollowToggleResponse {
    interface FollowToggleResponseJson extends ResponseJson {
      _followersCount: number;
      _followeesCount: number
    }

    const jsonObject: FollowToggleResponseJson =
      json as unknown as FollowToggleResponseJson;

    return new FollowToggleResponse(
      jsonObject._followersCount,
      jsonObject._followeesCount,
      jsonObject._success,
      jsonObject._message
    );
  }
}

export class GetPageOfUsersResponse extends TweeterResponse {
  private _users: User[];
  private _hasMorePages: boolean;

  constructor(
    users: User[],
    hasMorePages: boolean,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._users = users;
    this._hasMorePages = hasMorePages;
  }

  get users() {
    return this._users;
  }

  get hasMorePages() {
    return this._hasMorePages;
  }

  static fromJson(json: JSON): GetPageOfUsersResponse {
    interface GetPageOfUsersResponseJson extends ResponseJson {
      _users: JSON[];
      _hasMorePages: boolean
    }

    const jsonObject: GetPageOfUsersResponseJson =
      json as unknown as GetPageOfUsersResponseJson;

    const deserializedUsers = User.fromJsonArray(JSON.stringify(jsonObject._users));
    // const deserializedUsers = jsonObject._users.map((user) => User.fromJson(JSON.stringify(user)));

    if (deserializedUsers === null) {
      throw new Error(
        "GetPageOfUsersResponse, could not deserialize users with json:\n" +
        JSON.stringify(jsonObject._users)
      );
    }

    return new GetPageOfUsersResponse(
      deserializedUsers.map((user) => user!),
      jsonObject._hasMorePages,
      jsonObject._success,
      jsonObject._message
    );

  }

}

export class GetPageOfStatusesResponse extends TweeterResponse {
  private _statuses: Status[];
  private _hasMorePages: boolean;

  constructor(
    statuses: Status[],
    hasMorePages: boolean,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._statuses = statuses;
    this._hasMorePages = hasMorePages;
  }

  get statuses() {
    return this._statuses;
  }

  get hasMorePages() {
    return this._hasMorePages;
  }

  static fromJson(json: JSON): GetPageOfStatusesResponse {
    interface GetPageOfStatusesResponseJson extends ResponseJson {
      _statuses: JSON[];
      _hasMorePages: boolean
    }

    const jsonObject: GetPageOfStatusesResponseJson =
      json as unknown as GetPageOfStatusesResponseJson;

    let deserializedStatuses = Status.fromJsonArray(JSON.stringify(jsonObject._statuses));
    if (deserializedStatuses === null) {
      throw new Error(
        "GetPageOfStatusesResponse, could not deserialize statuses with json:\n" +
        JSON.stringify(jsonObject._statuses)
      );
    }

    return new GetPageOfStatusesResponse(
      deserializedStatuses,
      jsonObject._hasMorePages,
      jsonObject._success,
      jsonObject._message
    );

  }

}

export class GetCountResponse extends TweeterResponse {
  private _count: number;

  constructor(
    count: number,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._count = count;
  }

  get count() {
    return this._count;
  }

  static fromJson(json: JSON): GetCountResponse {
    interface GetCountResponseJson extends ResponseJson {
      _count: number;
    }

    const jsonObject: GetCountResponseJson =
      json as unknown as GetCountResponseJson;

    return new GetCountResponse(
      jsonObject._count,
      jsonObject._success,
      jsonObject._message
    );
  }
}

export class GetIsFollowerStatusResponse extends TweeterResponse {
  private _isFollower: boolean;

  constructor(
    isFollower: boolean,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._isFollower = isFollower;
  }

  get isFollower() {
    return this._isFollower;
  }

  static fromJson(json: JSON): GetIsFollowerStatusResponse {
    interface GetIsFollowerStatusResponseJson extends ResponseJson {
      _isFollower: boolean;
    }

    const jsonObject: GetIsFollowerStatusResponseJson =
      json as unknown as GetIsFollowerStatusResponseJson;

    return new GetIsFollowerStatusResponse(
      jsonObject._isFollower,
      jsonObject._success,
      jsonObject._message
    );
  }
}

export class GetUserResponse extends TweeterResponse {
  private _user: User | null;

  constructor(
    user: User | null,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._user = user;
  }

  get user() {
    return this._user;
  }

  static fromJson(json: JSON): GetUserResponse {
    interface GetUserResponseJson extends ResponseJson {
      _user: JSON;
    }

    const jsonObject: GetUserResponseJson =
      json as unknown as GetUserResponseJson;
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "GetUserResponse, could not deserialize user with json:\n" +
        JSON.stringify(jsonObject._user)
      );
    }

    return new GetUserResponse(
      deserializedUser,
      jsonObject._success,
      jsonObject._message
    );
  }
}

export class AuthenticateResponse extends TweeterResponse {
  private _user: User | null;
  private _token: AuthToken | null;

  constructor(
    user: User | null,
    token: AuthToken | null,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._user = user;
    this._token = token;
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  static fromJson(json: JSON): AuthenticateResponse {
    interface AuthenticateResponseJson extends ResponseJson {
      _user: JSON;
      _token: JSON;
    }

    const jsonObject: AuthenticateResponseJson =
      json as unknown as AuthenticateResponseJson;
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "AuthenticateResponse, could not deserialize user with json:\n" +
        JSON.stringify(jsonObject._user)
      );
    }

    const deserializedToken = AuthToken.fromJson(
      JSON.stringify(jsonObject._token)
    );

    if (deserializedToken === null) {
      throw new Error(
        "AuthenticateResponse, could not deserialize token with json:\n" +
        JSON.stringify(jsonObject._token)
      );
    }

    return new AuthenticateResponse(
      deserializedUser,
      deserializedToken,
      jsonObject._success,
      jsonObject._message
    );
  }
}