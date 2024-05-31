import {ChatBot} from "../models/chatBot";

export const sideBarItem = (chatbot: ChatBot): string => {
    let html : string = `<li>`;
    if (chatbot.enable) {
        html += `<input type="checkbox" id="${chatbot.name}" value="${chatbot.name}" class="hidden peer chatbotIcon" required="" checked="">`
    }else {
        html += `<input type="checkbox" id="${chatbot.name}" value="${chatbot.name}" class="hidden peer chatbotIcon" required="">`
    }
     html +=`   <label for="${chatbot.name}" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="flex items-center">
                        <img src="${chatbot.logoUrl}" class="h-6 me-3 sm:h-7" alt="${chatbot.name} -logo">
                        <div class="w-full text-lg font-semibold">${chatbot.name}</div>
                    </div>
                </label>          
             </li>`

    return html;
}