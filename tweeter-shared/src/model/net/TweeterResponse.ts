import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";

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

interface ResponseJson {
  _success: boolean;
  _message: string;
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