"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const SqsClient_1 = require("../SqsClient");
const handler = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("In follower fetcher");
        console.log("Event: " + event);
        for (let i = 0; i < event.Records.length; ++i) {
            const { body } = event.Records[i];
            console.log("FollowFetcher recieved message " + i + " it says " + body);
        }
        let sqsCommunicator = new SqsClient_1.SqsClientCommunicator();
        let count = 5;
        console.log("Sending Message to JobsQ");
        while (count > 0) {
            let messageToSend = {
                event: event.Records[0],
                followerNumber: "testFollower#" + count
            };
            console.log("sending message " + messageToSend);
            sqsCommunicator.sendMessage("JobsQ", JSON.stringify(messageToSend));
            count = count - 1;
        }
    });
};
exports.handler = handler;
