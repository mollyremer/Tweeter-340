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
exports.SqsClientCommunicator = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
class SqsClientCommunicator {
    constructor() {
        this.sqsClient = new client_sqs_1.SQSClient();
    }
    sendMessage(sqsName, messageBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqs_url = "";
            if (sqsName == "PostsQ") {
                sqs_url = "https://sqs.us-east-2.amazonaws.com/767398014777/PostsQ";
            }
            else if (sqsName == "JobsQ") {
                sqs_url = "https://sqs.us-east-2.amazonaws.com/767398014777/JobsQ";
            }
            else {
                throw Error("[Internal Server Error] sqs not found");
            }
            const params = {
                DelaySeconds: 10,
                MessageBody: messageBody,
                QueueUrl: sqs_url,
            };
            try {
                const data = yield this.sqsClient.send(new client_sqs_1.SendMessageCommand(params));
                console.log("Success, message sent. MessageID:", data.MessageId);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.SqsClientCommunicator = SqsClientCommunicator;
