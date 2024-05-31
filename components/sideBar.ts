import {ChatBot} from "../models/chatBot";

export const sideBar = (chatBotList: ChatBot[]): string => {

    return `<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <a href="" class="flex items-center ps-2.5 mb-5">
              <img src="assets/img/ChatBot.png" class="h-6 me-3 sm:h-7" alt="ChatLogo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ChatBot.io</span>
            </a>
            <p class="text-m text-black-600 ps-2.5 dark:text-gray-400">Choisi ton chatbot ⏬️</p>
            <ul class="mt-8 space-y-2 font-medium flex flex-col justify-start">
            ${chatBotList.map((chatBot: ChatBot) => chatBot.html).join('')}
            </ul>
          </div>`;
}