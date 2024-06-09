import {ChatBot} from "./chatBot";
import {messageFromBot, messageFromUser} from "../components/message";

export class Message {
    id: number;
    content: string;
    sender?: ChatBot;
    time: string;
    html: string;

    constructor(message: string, time: string, sender?: ChatBot) {
        this.id = Math.floor(Math.random() * 1000000);
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