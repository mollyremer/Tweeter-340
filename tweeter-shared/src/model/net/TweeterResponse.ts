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

export class FollowResponse extends TweeterResponse {
  private _authToken: AuthToken;
  private _user: User;
  private _pageSize: number;
  private _lastItem: User | null;

  constructor(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._authToken = authToken;
    this._user = user;
    this._pageSize = pageSize;
    this._lastItem = lastItem;
  }

  get authToken() {
    return this._authToken;
  }

  get user() {
    return this._user;
  }

  get pageSize() {
    return this._pageSize;
  }

  get lastItem() {
    return this._lastItem;
  }

  static fromJson(json: JSON): FollowResponse {
    interface ResponseResponseJson extends ResponseJson {
      _authToken: JSON
      _user: JSON;
      _pageSize: number;
      _lastItem: JSON;
    }

    const jsonObject: ResponseResponseJson =
      json as unknown as ResponseResponseJson;
    const deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject._authToken));

    if (deserializedAuthToken === null) {
      throw new Error(
        "StatusOrStoryResponse, could not deserialize authToken with json:\n" +
        JSON.stringify(jsonObject._authToken)
      );
    }
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "StatusOrStoryResponse, could not deserialize user with json:\n" +
        JSON.stringify(jsonObject._user)
      );
    }
    const deserializedLastItem = User.fromJson(JSON.stringify(jsonObject._lastItem));

    if (deserializedLastItem === null) {
      throw new Error(
        "StatusOrStoryResponse, could not deserialize item with json:\n" +
        JSON.stringify(jsonObject._lastItem)
      );
    }

    return new FollowResponse(
      deserializedAuthToken,
      deserializedUser,
      jsonObject._pageSize,
      deserializedLastItem,
      jsonObject._success,
      jsonObject._message
    );
  }

}

export class StatusResponse extends TweeterResponse {
  private _authToken: AuthToken;
  private _user: User;
  private _pageSize: number;
  private _lastItem: Status | null;

  constructor(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null,
    success: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._authToken = authToken;
    this._user = user;
    this._pageSize = pageSize;
    this._lastItem = lastItem;
  }

  get authToken() {
    return this._authToken;
  }

  get user() {
    return this._user;
  }

  get pageSize() {
    return this._pageSize;
  }

  get lastItem() {
    return this._lastItem;
  }

  static fromJson(json: JSON): StatusResponse {
    interface StatusResponseJson extends ResponseJson {
      _authToken: JSON
      _user: JSON;
      _pageSize: number;
      _lastItem: JSON;
    }

    const jsonObject: StatusResponseJson =
      json as unknown as StatusResponseJson;
    const deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject._authToken));

    if (deserializedAuthToken === null) {
      throw new Error(
        "StatusResponse, could not deserialize authToken with json:\n" +
        JSON.stringify(jsonObject._authToken)
      );
    }
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "StatusResponse, could not deserialize user with json:\n" +
        JSON.stringify(jsonObject._user)
      );
    }
    const deserializedLastItem = Status.fromJson(JSON.stringify(jsonObject._lastItem));

    if (deserializedLastItem === null) {
      throw new Error(
        "StatusResponse, could not deserialize item with json:\n" +
        JSON.stringify(jsonObject._lastItem)
      );
    }

    return new StatusResponse(
      deserializedAuthToken,
      deserializedUser,
      jsonObject._pageSize,
      deserializedLastItem,
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