import {Message} from "../models/message";
import {messages} from "../components/messages";
import {searchCommand} from "./chatbotService";

export let messageList: Message[] = []


const sendButton = document.querySelector("#send-message");

sendButton.addEventListener('click', () => {
    const message = document.querySelector('#message-content').value.trim()
    if (message) {
        saveMessage(new Message(message, new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()));
        searchCommand(message)
        document.querySelector('#message-content').value = '';
    }
})

document.querySelector('#message-content').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = document.querySelector('#message-content').value.trim()
        if (message) {
            sendButton.click();
        }
    }
})

export const saveMessage = (message: Message) => {
    messageList.push(message)
    document.querySelector('#messages').innerHTML = messages(messageList);
    localStorage.setItem('messageList', JSON.stringify(messageList));
    scrollToBottom();
}


const loadMessages = () => {
    jSuites.loading.show();
    const savedMessages = localStorage.getItem('messageList');
    if (savedMessages) {
        messageList = JSON.parse(savedMessages);
        document.querySelector('#messages').innerHTML = messages(messageList);
        // Scroll to the bottom of the chat
        scrollToBottom();
    }
    jSuites.loading.hide();


}
loadMessages();


async function scrollToBottom() {
    await delay(50);
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}