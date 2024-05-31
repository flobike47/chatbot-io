export class WeatherService {

    static getWeather(city, callback) {
        fetch(`https://www.prevision-meteo.ch/services/json/${city.toLowerCase()}`)
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

    static dataToString(data : JSON): string {
        return 'À ' + data['city_info']['name'] + ', actuellement la temperature est de ' + data['current_condition']['tmp'] + '°C '+ 'et le temps est ' + data['current_condition']['condition'] + ' avec un vent est de ' + data['current_condition']['wnd_spd'] + 'km/h';
    }

}