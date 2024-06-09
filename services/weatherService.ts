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
        return 'À ' + data['city_info']['name'] + ', actuellement la temperature est de ' + data['current_condition']['tmp'] + '°C '+ 'et le temps est ' + data['current_condition']['condition'].toLowerCase() + ' avec un vent est de ' + data['current_condition']['wnd_spd'] + 'km/h';
    }

    static getTomorrowWeather(city, callback) {
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

    static tomorrowDataToString(data : JSON): string {
        return 'Demain à ' + data['city_info']['name'] + ', la temperature ira de ' + data["fcst_day_1"]['tmin'] + '°C à '+ + data["fcst_day_1"]['tmax'] + '°C '+'et le temps sera ' + data["fcst_day_1"]['condition_key'];
    }

}