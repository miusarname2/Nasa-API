const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/asteroids', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date: '2015-09-07',
        end_date: '2015-09-08',
        api_key: 'DEMO_KEY'
      }
    });

    const asteroids = response.data.near_earth_objects;

    res.json(asteroids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

