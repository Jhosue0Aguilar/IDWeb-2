module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const body = { status: 'error', message: 'Error interno del servidor' };
  // El detalle técnico solo se expone fuera de producción
  if (process.env.NODE_ENV !== 'production') body.detail = err.message;
  res.status(500).json(body);
};
