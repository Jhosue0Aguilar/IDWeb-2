let cursos = [
  { id: 1, nombre: 'Introducción al Desarrollo Web', codigo: 'IDW101', creditos: 4 },
  { id: 2, nombre: 'Base de Datos', codigo: 'BD201', creditos: 3 }
];
let nextId = 3;
module.exports = { cursos, getNextId: () => nextId++ };