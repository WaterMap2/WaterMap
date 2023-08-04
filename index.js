const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const app = express();
app.listen(4950, () => console.log('listening at 4949'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json = ({
        status: "success",
        latitude: data.lat,
        longitude: data.lng,
        time: data.time,
        date: data.date,
        color: data.color,
        timestamp: timestamp,
    });
});