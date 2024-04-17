export const handler = async function (event: any) {
    console.log("in job handler!");
    console.log("full event is " + event);

    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        console.log("JobHandler recieved message " + i + " it says " + body);

        try{
            let statusRecieved = JSON.parse(event.Record[0].body).event;
            console.log(".event" + statusRecieved);
            let followerNumberRecieved = JSON.parse(event.Record[1].body).followerNumber;
            console.log(".followerNumber" + followerNumberRecieved);
        } catch(error){
            throw Error("[Internal Server Error] in Job Handler");
        }
    }
};
