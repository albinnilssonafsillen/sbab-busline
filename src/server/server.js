import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/buslines', (req, res) => {
  const apiEndpoint = `https://api.sl.se/api2/LineData.json?model=JourneyPatternPointOnLine&key=${process.env.APIKEY}&DefaultTransportModeCode=BUS`;
  axios
    .get(apiEndpoint)
    .then((response) => {
      res.json(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/api/busstops', (req, res) => {
  const apiEndpoint = `https://api.sl.se/api2/LineData.json?model=StopPoint&key=${process.env.APIKEY}&DefaultTransportModeCode=BUS`;
  axios
    .get(apiEndpoint)
    .then((response) => {
      res.json(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
