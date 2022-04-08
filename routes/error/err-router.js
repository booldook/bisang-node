module.exports = ({status, message}, req, res, next) => {
  res.send(`
  <h1>Error</h1>
  <hr>
  <h2>${status}</h2>
  <h3>${message}</h3>
  `);
}