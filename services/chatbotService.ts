import {ChatBot} from "../models/chatBot";
import {Action} from "../models/action";
import {GoogleSearch} from "./googleSearch";
import {Message} from "../models/message";
import {enableInput, saveMessage} from "./messageService";
import {WeatherService} from "./weatherService";
import {AstroService} from "./astroService";
import {CyclingService} from "./cyclingService";


export let chatBotList: ChatBot[] = [
    new ChatBot('Météo Assistant', [

        new Action('météo', 'avoir la météo d\'une ville', ['weather', 'get weather', 'meteo'], WeatherService.getWeather, WeatherService.dataToString, 'la ville'),

        new Action('météo', 'avoir la météo de demain ', ['tomorrow weather', 'demain meteo'], WeatherService.getTomorrowWeather, WeatherService.tomorrowDataToString, 'la ville'),

        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null)

    ], 'https://m.media-amazon.com/images/I/61nuuPxUvaL.png'),

    new ChatBot('Astro Assistant', [

        new Action('Horoscope', 'avoir les astres du jour', ['astro', 'horoscope'], AstroService.getAstro, AstroService.astroDataToString),

        new Action('Signe astro', 'avoir son signe par rapport à sa date de naissance', ['signe astro'], AstroService.getAstroSigne, AstroService.astroSigneToString),

        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null)
    ], 'https://upload.wikimedia.org/wikipedia/commons/f/f4/ASTRO_LOGO.png?20210628024211'),

    new ChatBot('Cycling Assistant', [

        new Action('disponible', 'appeler les services disponibles', ['services'], (param: string, callback, chatbot: ChatBot) => {
            return `Le service ${chatbot.name} est disponible`
        }, null),

        new Action('rider', 'avoir les informations d\'un coureur', ['rider info', 'cyclist info'], CyclingService.getRiderInfo, CyclingService.riderDataToString),

    ], 'https://logowik.com/content/uploads/images/free-vector-bicycle-and-cyclist617.logowik.com.webp')
]

export function searchCommand(messageContent: string, index: number = 0) {

    let chatbotEnable: ChatBot[] = chatBotList.filter(chatbot => chatbot.enable);

    if (index >= chatbotEnable.length) {
        enableInput();
        return;
    }

    let commandIsFound : boolean = false;

    if (messageContent === 'help' || messageContent === 'aide') {
        commandIsFound = true;
        sendChatbotMessage(chatbotEnable[index].help(), chatbotEnable[index]);
    }
    chatbotEnable[index].action.forEach(action => {
        const commandFound = action.getKeys().find(key => messageContent.includes(key) && messageContent.indexOf(key) === 0);
        if (commandFound) {
            commandIsFound = commandFound;
            const param: string = splitOnFirst(messageContent, commandFound)[1].trim();
            const actionResult = action.execute(param, (error, data) => {
                if (error) {
                    console.error('Error:', error);
                    sendChatbotMessage(`Une erreur c'est produite durant la commande ${action.getName()}`, chatbotEnable[index]);
                    return
                }
                const message = action.format != null ? action.formatData(data, param) : data
                sendChatbotMessage(message, chatbotEnable[index])

            }, chatbotEnable[index]);
            actionResult ? sendChatbotMessage(action.format != null ? action.formatData(actionResult, param) : actionResult, chatbotEnable[index]) : null;

        }
    });

    setTimeout(() => {
        searchCommand(messageContent, index + 1);
    },commandIsFound ? 1000 : 0);

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