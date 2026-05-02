const app = require('./app');
const pool = require('./config/db');

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});

pool.connect()
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('DB connection error', err));