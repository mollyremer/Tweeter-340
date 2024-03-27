import { AuthenticateResponse, LoginRequest, RegisterRequest } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {

  private SERVER_URL = "http://localhost:5173";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    // const endpoint = "/service/login";
    const endpoint = "/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    // const endpoint = "/service/login";
    const endpoint = "/register";
    const response: JSON = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }
}