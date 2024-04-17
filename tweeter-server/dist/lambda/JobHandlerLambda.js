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
const handler = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in job handler!");
        console.log("full event is " + event);
        for (let i = 0; i < event.Records.length; ++i) {
            const { body } = event.Records[i];
            console.log("JobHandler recieved message " + i + " it says " + body);
            try {
                let statusRecieved = JSON.parse(event.Record[0].body).event;
                console.log(".event" + statusRecieved);
                let followerNumberRecieved = JSON.parse(event.Record[1].body).followerNumber;
                console.log(".followerNumber" + followerNumberRecieved);
            }
            catch (error) {
                throw Error("[Internal Server Error] in Job Handler");
            }
        }
    });
};
exports.handler = handler;
