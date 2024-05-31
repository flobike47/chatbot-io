import {ChatBot} from "../models/chatBot";
import {Action} from "../models/action";
import {GoogleSearch} from "./googleSearch";
import {Message} from "../models/message";
import {saveMessage} from "./messageService";
import {WeatherService} from "./weatherService";
import {AstroService} from "./astroService";


export let chatBotList: ChatBot[] = [
    new ChatBot('Google Assistant', [

        new Action('Google Search', 'search on google wath you want', ['dis google', 'ok google'], GoogleSearch.searchOnGoogle, null),

        new Action('get weather', 'get the weather of a city', ['weather', 'get weather', 'meteo'], WeatherService.getWeather, WeatherService.dataToString),

        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null)
    ], 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Google_Assistant_logo.svg/1024px-Google_Assistant_logo.svg.png'),

    new ChatBot('Chat GPT', [

        new Action('Astro', 'avoir les astres du jour', ['astro'], AstroService.getAstro, AstroService.dataToString),
        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null)
    ], 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png'),
    new ChatBot('Notion', [
        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null)
    ], 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png')
]

export function searchCommand(messageContent: string) {
    chatBotList
        .filter(chatbot => chatbot.enable)
        .forEach(chatbot => {
            chatbot.action.forEach(action => {
                const commandFound = action.getKeys().find(key => messageContent.includes(key));
                if (commandFound) {
                    const param: string = splitOnFirst(messageContent, commandFound)[1].trim();
                    const actionResult = action.execute(param, (error, data) => {
                        if (error) {
                            console.error('Error:', error);
                            sendChatbotMessage(`Une erreur c'est produite durant la commande ${action.getName()}`, chatbot);
                            return
                        }
                        const message = action.format != null ? action.formatData(data, param) : data
                        sendChatbotMessage(message, chatbot)

                    }, chatbot);
                    actionResult ? sendChatbotMessage(actionResult, chatbot) : null;
                }
            });
        });

}


function sendChatbotMessage(message: string, chatbot: ChatBot) {
    const chatbotMessage = new Message(message, new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes(), chatbot);
    saveMessage(chatbotMessage);
}

function splitOnFirst(string, separator) {
    if (!(typeof string === 'string' && typeof separator === 'string')) {
        throw new TypeError('Expected the arguments to be of type `string`');
    }

    if (string === '' || separator === '') {
        return [];
    }

    const separatorIndex = string.indexOf(separator);

    if (separatorIndex === -1) {
        return [];
    }

    return [
        string.slice(0, separatorIndex),
        string.slice(separatorIndex + separator.length)
    ];
}