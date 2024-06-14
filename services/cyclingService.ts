export class CyclingService {


    static getRiderInfo(param, callback) {


        fetch(`https://cycling-databse.herokuapp.com/api/bicycle-racers/${param.replaceAll(" ", "-").toLowerCase()}/info`)
            .then(response => {
                switch (response.status) {
                    case 404:
                        return `Le coureur ${param.replaceAll(" ", "-").toLowerCase()} n\'a pas été trouvé.`
                    case 500:
                        throw new Error('Erreur serveur');
                    case 200:
                        break;
                    default:
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

    static riderDataToString(data: JSON): string {

        //data is in the form of a JSON object like this:
        `{
            "riderName": "Wout Van Aert",
                "dateOfBirth": "2nd March 1998",
                "age": 25,
                "height": 1.76,
                "nationality": "Belgium",
                "weight": 75,
                "relativeStrength": [
                {
                    "gc": 9.02,
                    "timeTrial": 4.3,
                    "sprint": 100,
                    "climber": 33.77,
                }
            ]
        }`

        //build string from this response
        return data != null ? ` Voici les informations de ${data["riderName"].replaceAll("-", " ")} :
            - Il est né le ${CyclingService.convertToFrenchDate(data["dateOfBirth"])} et il a ${data["age"]} ans. </br>
            - Sa taille est de ${data["height"]} mètres. </br>
            - Il pèse ${data["weight"]} kg. </br>
            - Sa nationalité est ${data["nationality"]}. </br>
            - Force relative : </br>
              &nbsp;&nbsp;&nbsp;- GC: ${data["relativeStrength"][0]["gc"]} </br>
              &nbsp;&nbsp;&nbsp;- Time Trial: ${data["relativeStrength"][0]["timeTrial"]} </br>
              &nbsp;&nbsp;&nbsp;- Sprint: ${data["relativeStrength"][0]["sprint"]} </br>
              &nbsp;&nbsp;&nbsp;- Climber: ${data["relativeStrength"][0]["climber"]}` : `Ce coureur n\'a pas été trouvé.`;
    }

    static convertToFrenchDate(englishDate) {
        // Dictionary for month names in French
        const monthNamesFrench = [
            "janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ];

        // Remove the ordinal suffix (st, nd, rd, th)
        const dateWithoutSuffix = englishDate.replace(/(\d+)(st|nd|rd|th)/, '$1');

        // Parse the date
        const dateParts = dateWithoutSuffix.split(' ');
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        // Get the month index
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

        // Convert to French date format
        const frenchDate = `${day} ${monthNamesFrench[monthIndex]} ${year}`;

        return frenchDate;
    }

}