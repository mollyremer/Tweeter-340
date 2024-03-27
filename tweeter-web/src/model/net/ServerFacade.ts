import { AuthenticateResponse, LoginRequest, LogoutRequest, RegisterRequest, TweeterResponse, GetUserRequest, GetUserResponse } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {

  private SERVER_URL = "https://ys2u0tn8u8.execute-api.us-east-2.amazonaws.com/tweeter-dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    const endpoint = "/register";
    const response: JSON = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async logout(request: LogoutRequest): Promise<TweeterResponse> {
    const endpoint = "/logout";
    const response: JSON = await this.clientCommunicator.doPost<LogoutRequest>(request, endpoint);

    return TweeterResponse.fromJson(response);
  }

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const endpoint = "/getUser";
    const response: JSON = await this.clientCommunicator.doPost<GetUserRequest>(request, endpoint);

    return GetUserResponse.fromJson(response);
  }
}