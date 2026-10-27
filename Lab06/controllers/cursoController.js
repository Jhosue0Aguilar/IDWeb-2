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

exports.create = (req, res) => {
  const { nombre, codigo, creditos } = req.body;
  if (!nombre || !codigo || creditos === undefined) {
    return res.status(400).json({ status: 'fail', message: 'Faltan campos obligatorios (nombre, codigo, creditos)' });
  }
  const nuevo = { id: db.getNextId(), nombre, codigo, creditos: Number(creditos) };
  db.cursos.push(nuevo);
  res.status(201).json({ status: 'success', data: nuevo });
};

exports.update = (req, res) => {
  const curso = db.cursos.find(c => c.id === Number(req.params.id));
  if (!curso) return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  const { nombre, codigo, creditos } = req.body;
  if (nombre !== undefined) curso.nombre = nombre;
  if (codigo !== undefined) curso.codigo = codigo;
  if (creditos !== undefined) curso.creditos = Number(creditos);
  res.status(200).json({ status: 'success', data: curso });
};

exports.remove = (req, res) => {
  const idx = db.cursos.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ status: 'fail', message: 'Curso no encontrado' });
  db.cursos.splice(idx, 1);
  res.status(200).json({ status: 'success', message: 'Curso eliminado correctamente' });
};