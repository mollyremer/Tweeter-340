import { SqsClientCommunicator } from "../SqsClient";

export const handler = async function (event: any) {
    console.log("In follower fetcher");
    console.log("Event: " + event);

    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        console.log("FollowFetcher recieved message " + i + " it says " + body);
    }

    let sqsCommunicator = new SqsClientCommunicator();
    let count: number = 5;

    console.log("Sending Message to JobsQ");
    while (count > 0){
        let messageToSend = {
            event: event.Records[0],
            followerNumber: "testFollower#" + count
        }
        
        console.log("sending message " + messageToSend);
        sqsCommunicator.sendMessage("JobsQ", JSON.stringify(messageToSend));
        count = count - 1;
    }
};
