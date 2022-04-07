module.exports = (err, req, res, next) => {
  res.send(`
  <h1>Error</h1>
  <hr>
  <h2>${err.status}</h2>
  <h3>${err.message}</h3>
  `);
}