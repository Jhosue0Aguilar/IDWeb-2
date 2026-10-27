module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor', detail: err.message });
};