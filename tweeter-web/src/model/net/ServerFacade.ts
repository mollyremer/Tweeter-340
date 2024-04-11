import { AuthenticateResponse, LoginRequest, LogoutRequest, RegisterRequest, TweeterResponse, GetUserRequest, GetUserResponse, GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, GetFolloweesCountRequest, GetCountResponse, GetFollowerCountRequest, PostStatusRequest, FollowToggleResponse, followToggleRequest} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import { loadMoreStatusItemsRequest, loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { GetPageOfStatusesResponse, GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";

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

  async getIsFollowerStatus(request: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> {
    const endpoint = "/getIsFollowerStatus";
    const response: JSON = await this.clientCommunicator.doPost<GetIsFollowerStatusRequest>(request, endpoint);

    return GetIsFollowerStatusResponse.fromJson(response);
  }

  async getFolloweesCount(request: GetFolloweesCountRequest): Promise<GetCountResponse> {
    const endpoint = "/getFolloweesCount";
    const response: JSON = await this.clientCommunicator.doPost<GetFolloweesCountRequest>(request, endpoint);

    return GetCountResponse.fromJson(response);
  }

  async getFollowerCount(request: GetFollowerCountRequest): Promise<GetCountResponse> {
    const endpoint = "/getFollowersCount";
    const response: JSON = await this.clientCommunicator.doPost<GetFollowerCountRequest>(request, endpoint);

    return GetCountResponse.fromJson(response);
  }

  async postStatus(request: PostStatusRequest): Promise<TweeterResponse> {
    const endpoint = "/postStatus";
    const response: JSON = await this.clientCommunicator.doPost<PostStatusRequest>(request, endpoint);

    return TweeterResponse.fromJson(response);
  }

  async loadMoreFeedItems(request: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> {
    const endpoint = "/loadMoreFeedItems";
    const response: JSON = await this.clientCommunicator.doPost<loadMoreStatusItemsRequest>(request, endpoint);

    return GetPageOfStatusesResponse.fromJson(response);
  }

  async loadMoreStoryItems(request: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> {
    const endpoint = "/loadMoreStoryItems";
    const response: JSON = await this.clientCommunicator.doPost<loadMoreStatusItemsRequest>(request, endpoint);

    return GetPageOfStatusesResponse.fromJson(response);
  }

  async loadMoreFollowers(request: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> {
    const endpoint = "/loadMoreFollowers";
    const response: JSON = await this.clientCommunicator.doPost<loadMoreFollowsRequest>(request, endpoint);

    return GetPageOfUsersResponse.fromJson(response);
  }
 
  async loadMoreFollowees(request: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> {
    const endpoint = "/loadMoreFollowees";
    const response: JSON = await this.clientCommunicator.doPost<loadMoreFollowsRequest>(request, endpoint);

    return GetPageOfUsersResponse.fromJson(response);
  }

  async follow(request: followToggleRequest): Promise<FollowToggleResponse> {
    const endpoint = "/follow";
    const response: JSON = await this.clientCommunicator.doPost<followToggleRequest>(request, endpoint);

    return FollowToggleResponse.fromJson(response);
  }

  async unfollow(request: followToggleRequest): Promise<FollowToggleResponse> {
    const endpoint = "/unfollow";
    const response: JSON = await this.clientCommunicator.doPost<followToggleRequest>(request, endpoint);

    return FollowToggleResponse.fromJson(response);
  }
}