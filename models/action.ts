export class Action {
    name: string;
    description: string;
    keys: string[];
    function: Function;
    format?: Function;


    constructor(name: string, description: string, keys: string[], func: Function, formatFunc?: Function){
        this.name = name;
        this.description = description;
        this.keys = keys;
        this.function = func;
        this.format = formatFunc;
    }

    execute(...args: any[]){

        return this.function(...args);
    }

    formatData(...args: any[]){
        return this.format(...args);
    }

    getKeys(){
        return this.keys;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }
}