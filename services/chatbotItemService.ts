import {chatBotList} from "./chatbotService";

document.addEventListener('DOMContentLoaded', (event) => {
    const checkboxes = document.querySelectorAll('.chatbotIcon');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const chatBotName = event.target.value;
            chatBotList.forEach(chatBot => {
                if (chatBot.name === chatBotName) {
                    chatBot.enable = !chatBot.enable
                    chatBot.saveState()
                }
            })
        });
    });
});