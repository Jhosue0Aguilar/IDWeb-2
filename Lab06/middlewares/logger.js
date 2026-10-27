module.exports = (req, res, next) => {
  const inicio = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - inicio} ms)`);
  });
  next();
};

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor', detail: err.message });
};