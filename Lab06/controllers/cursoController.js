const db = require('../data/cursos');

exports.getAll = (req, res) => {
  let result = db.cursos;
  if (req.query.creditos) {
    result = result.filter(c => c.creditos === Number(req.query.creditos));
  }
  res.status(200).json({ status: 'success', data: result });
};

exports.getById = (req, res) => {
  const curso = db.cursos.find(c => c.id === Number(req.params.id));
  if (!curso) return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  res.status(200).json({ status: 'success', data: curso });
};