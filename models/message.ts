import {ChatBot} from "./chatBot";
import {messageFromBot, messageFromUser} from "../components/message";

export class Message {
    content: string;
    sender?: ChatBot;
    time: string;
    html: string;

    constructor(message: string, time: string, sender?: ChatBot) {
        this.content = message;
        this.time = time;

        if (sender) {
            this.sender = sender;
            this.html = messageFromBot(this);
        }else {
            this.html = messageFromUser(this);
        }
    }
}