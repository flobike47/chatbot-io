export class AstroService {


    static getAstro(param, callback) {
        fetch(`https://kayoo123.github.io/astroo-api/jour.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Erreur lors de l\'appel de l\'API:', error);
                callback(error, null);
            });
    }

    static astroDataToString(data: JSON, astre): string {
        return data[astre] != null ? `Aujourd\'hui, les astres vous conseillent de </br> ${data[astre]}` : `Votre astre ${astre} n\'a pas été trouvé.`
    }

    static getAstroSigne(date: string) {

        let dateNaissance = AstroService.formatDateToDateObject(date);

        console.log(dateNaissance);


        let signeList = [
            AstroService.buildPair('Capricorne', {start: new Date(dateNaissance.getFullYear(), 11, 22), end: new Date(dateNaissance.getFullYear(), 0, 19)}),
            AstroService.buildPair('Verseau', {start: new Date(dateNaissance.getFullYear(), 0, 20), end: new Date(dateNaissance.getFullYear(), 1, 18)}),
            AstroService.buildPair('Poissons', {start: new Date(dateNaissance.getFullYear(), 1, 19), end: new Date(dateNaissance.getFullYear(), 2, 20)}),
            AstroService.buildPair('Bélier', {start: new Date(dateNaissance.getFullYear(), 2, 21), end: new Date(dateNaissance.getFullYear(), 3, 19)}),
            AstroService.buildPair('Taureau', {start: new Date(dateNaissance.getFullYear(), 3, 20), end: new Date(dateNaissance.getFullYear(), 4, 20)}),
            AstroService.buildPair('Gémeaux', {start: new Date(dateNaissance.getFullYear(), 4, 21), end: new Date(dateNaissance.getFullYear(), 5, 21)}),
            AstroService.buildPair('Cancer', {start: new Date(dateNaissance.getFullYear(), 5, 22), end: new Date(dateNaissance.getFullYear(), 6, 22)}),
            AstroService.buildPair('Lion', {start: new Date(dateNaissance.getFullYear(), 6, 23), end: new Date(dateNaissance.getFullYear(), 7, 22)}),
            AstroService.buildPair('Vierge', {start: new Date(dateNaissance.getFullYear(), 7, 23), end: new Date(dateNaissance.getFullYear(), 8, 22)}),
            AstroService.buildPair('Balance', {start: new Date(dateNaissance.getFullYear(), 8, 23), end: new Date(dateNaissance.getFullYear(), 9, 22)}),
            AstroService.buildPair('Scorpion', {start: new Date(dateNaissance.getFullYear(), 9, 23), end: new Date(dateNaissance.getFullYear(), 10, 21)}),
            AstroService.buildPair('Sagittaire', {start: new Date(dateNaissance.getFullYear(), 10, 22), end: new Date(dateNaissance.getFullYear(), 11, 21)})
        ];

        let signe = signeList.find(signe => dateNaissance >= signe.value.start && dateNaissance <= signe.value.end);
        return signe ? signe.key : null;

    }

    static astroSigneToString(signe: string): string {
        return `Votre signe astrologique est ${signe}`;
    }

    private static buildPair(key: string, value: any): object {
        return {
            key: key,
            value: value
        };
    }

    private static formatDateToDateObject(dateString) {
        const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = dateString.match(regex);

        if (!match) {
            throw new Error("La date doit être au format dd-mm-yyyy");
        }

        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // Les mois en JavaScript sont indexés de 0 à 11
        const year = parseInt(match[3], 10);

        return new Date(year, month, day);
    }

}