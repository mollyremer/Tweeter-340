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
}

interface ResponseJson {
  _success: boolean;
  _message: string;
}

export class AuthenticateResponse extends TweeterResponse {
  private _user: User | null;
  private _token: AuthToken | null;

  constructor(
    success: boolean,
    user: User | null,
    token: AuthToken | null,
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
      jsonObject._success,
      deserializedUser,
      deserializedToken,
      jsonObject._message
    );
  }
}

// export class TweeterResponse {}

// export class BadResponse extends TweeterResponse {
//   private _message: string;

//   constructor(message: string){
//     super();
//     this._message = message;
//   }

//   get message() {
//     return this._message;
//   }

//   static fromJson(json: JSON): BadResponse {
//     interface BadResponseJson {
//       _message: string;
//     }

//     const jsonObject: BadResponseJson = json as unknown as BadResponseJson;

//     return new BadResponse(
//       jsonObject._message
//     );
//   }
// }

// export class AuthenticateResponse extends TweeterResponse {
//   private _user: User;
//   private _token: AuthToken;

//   constructor(
//     user: User,
//     token: AuthToken
//   ) {
//     super();
//     this._user = user;
//     this._token = token;
//   }

//   get user() {
//     return this._user;
//   }

//   get token() {
//     return this._token;
//   }

//   static fromJson(json: JSON): AuthenticateResponse {
//     interface AuthenticateResponseJson {
//       _user: JSON;
//       _token: JSON;
//     }

//     const jsonObject: AuthenticateResponseJson =
//       json as unknown as AuthenticateResponseJson;
//     const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

//     if (deserializedUser === null) {
//       throw new Error(
//         "AuthenticateResponse, could not deserialize user with json:\n" +
//           JSON.stringify(jsonObject._user)
//       );
//     }

//     const deserializedToken = AuthToken.fromJson(
//       JSON.stringify(jsonObject._token)
//     );

//     if (deserializedToken === null) {
//       throw new Error(
//         "AuthenticateResponse, could not deserialize token with json:\n" +
//           JSON.stringify(jsonObject._token)
//       );
//     }

//     return new AuthenticateResponse(
//       deserializedUser,
//       deserializedToken,
//     );
//   }
// }

//      jsonObject._success,

//jsonObject._message