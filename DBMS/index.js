const pg = require('pg');

const pgClient = new pg.Client({
  host: '',
  user: 'postgres',
  port: 5433,
  password: 'password',
  database: 'checkers'
});
pgClient.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

const getLeaders = () => {
  return pgClient.query('SELECT * from leaderboard limit 10');
};
module.exports = {getLeaders}