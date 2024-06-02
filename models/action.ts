export class Action {
    name: string;
    description: string;
    keys: string[];
    function: Function;
    format?: Function;
    parameterRegex: string;


    constructor(name: string, description: string, keys: string[], func: Function, formatFunc?: Function, parameterRegex?: string){
        this.name = name;
        this.description = description;
        this.keys = keys;
        this.function = func;
        this.format = formatFunc;
        this.parameterRegex = parameterRegex;
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

    getHelp(){
        return `<U>${this.name}</U> : ${this.description} pour l'uliliser tapez ${this.keys.map(key =>'<strong>'+ key + '</strong> or ').join('')} suivi de ${this.parameterRegex}`
    }
}