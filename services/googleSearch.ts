export class GoogleSearch {

    static async searchOnGoogle(query: string): Promise<string[]> {
        try {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", "PHPSESSID=kfjp0vssuh72gqikfkb92jilik");
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Access-Control-Allow-Origin", "http://localhost:5173");
                myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                myHeaders.append("access-control-allow-headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                    mode: 'no-cors'
                };

                fetch(`https://www.google.com/search?q=${query}`, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error('Failed to fetch search results:', error);
            return [];
        }
    }
}
