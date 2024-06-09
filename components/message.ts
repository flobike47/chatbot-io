import {Message} from "../models/message";

export const messageFromBot = (message: Message): string => {
    return `<div class="snap-center chat-message" id=${message.id}>
         <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-s max-w-xs mx-2 order-2 items-start">
               <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">${message.content}</span></div>
               <div><span class="text-gray-400 text-xs">${message.time}</span></div>
            </div>
            <img src="${message.sender.logoUrl}" alt="My profile" class="w-6 h-6 rounded-full order-1">
         </div>
      </div>`;
}

export const messageFromUser = (message: Message): string => {
    return `<div class="snap-center chat-message" id=${message.id}>
         <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-s max-w-xs mx-2 order-1 items-end">
               <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">${message.content}</span></div>
                <div><span class="text-gray-400 text-xs">${message.time}</span></div>
            </div>
         </div>
      </div>`;
}