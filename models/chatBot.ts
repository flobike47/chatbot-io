import {Action} from "../models/action";
import {sideBarItem} from "../components/sideBarItem";

export class ChatBot {

    name: string;

    action: Action[];

    logoUrl: string;

    html: string;

    enable: boolean;

    constructor(name: string, action: Action[], logoUrl: string) {
        this.name = name;
        this.action = action;
        this.logoUrl = logoUrl;
        if (localStorage.getItem(this.name) === 'false') {
            this.enable = false;
        }else {
            this.enable = true;
        }

        this.html = sideBarItem(this);

    }

    saveState = () => {
        localStorage.setItem(this.name, this.enable.toString());
    }

}