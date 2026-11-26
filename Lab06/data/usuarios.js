// "Base de datos" en memoria de usuarios (mismo estilo que data/cursos.js)
let usuarios = [];
let nextId = 1;
module.exports = { usuarios, getNextId: () => nextId++ };
