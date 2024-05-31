import {sideBar} from "../components/sideBar";
import {chatBotList} from "./chatbotService";

document.querySelector('#default-sidebar').innerHTML = sideBar(chatBotList);
