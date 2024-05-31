import {Message} from "../models/message";

export const messages = (messageList: Message[]) => {
    return messageList.map((message: Message) => message.html).join('');
}