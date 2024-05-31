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

    static dataToString(data: JSON, astre): string {
        return data[astre] != null ? `Aujourd\'hui, les astres vous conseillent de </br> ${data[astre]}`: `Votre astre ${astre} n\'a pas été trouvé.`
    }
}