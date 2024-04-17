import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export class SqsClientCommunicator{

    private sqsClient = new SQSClient();

    public async sendMessage(sqsName: string, messageBody: string): Promise<void> {
        let sqs_url = "";
        if (sqsName == "PostsQ") {
            sqs_url = "https://sqs.us-east-2.amazonaws.com/767398014777/PostsQ";
        } else if (sqsName == "JobsQ") {
            sqs_url = "https://sqs.us-east-2.amazonaws.com/767398014777/JobsQ";
        } else {
            throw Error("[Internal Server Error] sqs not found");
        }

        const params = {
            DelaySeconds: 10,
            MessageBody: messageBody,
            QueueUrl: sqs_url,
        };

        try {
            const data = await this.sqsClient.send(new SendMessageCommand(params));
            console.log("Success, message sent. MessageID:", data.MessageId);
        } catch (err) {
            throw err;
        }
    }

}