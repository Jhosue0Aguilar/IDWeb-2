const db = require('../data/cursos');

exports.getAll = (req, res) => {
  let result = db.cursos;
  if (req.query.creditos) {
    result = result.filter(c => c.creditos === Number(req.query.creditos));
  }
  res.status(200).json({ status: 'success', data: result });
};