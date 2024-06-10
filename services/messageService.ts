import {Message} from "../models/message";
import {messages} from "../components/messages";
import {searchCommand} from "./chatbotService";
import gsap from "gsap";


export let messageList: Message[] = []


const sendButton = document.querySelector("#send-message");

sendButton.addEventListener('click', () => {
    const message = document.querySelector('#message-content').value.trim()
    if (message) {
        disableInput();
        saveMessage(new Message(message, new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()));
        setTimeout(() => {
            searchCommand(message)
        }, 1000)
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
    document.querySelector('#messages').innerHTML += message.html;
    localStorage.setItem('messageList', JSON.stringify(messageList));
    scrollToBottom();
    animateMessageContent(message.id);

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
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function disableInput() {
    document.querySelector('#message-content').setAttribute('disabled', 'disabled');
    document.querySelector('#send-message').setAttribute('disabled', 'disabled');
}

export function enableInput() {
    document.querySelector('#message-content').removeAttribute('disabled');
    document.querySelector('#send-message').removeAttribute('disabled');
}


function animateMessageContent(messageId) {

    let h1 = document.getElementById(messageId);

    gsap.set(h1, {perspective: 500});
    let $tween = gsap.from(h1, {
        duration: 0.5,
        scale: 2,
        autoAlpha: 0,
        ease: "front",
        stagger: 0.02
    });
}