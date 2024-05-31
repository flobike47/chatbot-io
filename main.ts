import './style.css'
import {sideBar} from "./components/sideBar";
import {chat} from "./components/chat";
import {messages} from "./components/messages";


document.querySelector('#default-sidebar').innerHTML = sideBar([]);

document.querySelector('#messages').innerHTML = messages([]);
document.querySelector('#chat').innerHTML = chat();

