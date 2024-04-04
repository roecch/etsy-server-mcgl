
export default function Search(app) {
    app.get('/ping', async (req, res) => {
        const requestOptions = {
            'method': 'GET',
            'headers': {
                'x-api-key': 'r9iit6q32jvv178f1vpc9vls',
            },
        };

        const response = await fetch(
            'https://api.etsy.com/v3/application/openapi-ping',
            requestOptions
        );

        if (response.ok) {
            const data = await response.json();
            res.send(data);
        } else {
            res.send("oops");
        }
    });

    app.get("/api/search", async (req, res) => {
        const { searchTerm } = req.params;

        const requestOptions = {
            'method': 'GET',
            'headers': {
                'x-api-key': 'r9iit6q32jvv178f1vpc9vls',
            },
        };

        const response = await fetch(
            `https://api.etsy.com/v3/listings/active`,
            requestOptions
        );

        if (response.ok) {
            const data = await response.json();
            res.send(data);
        } else {
            res.send("oops");
        }
      });
}