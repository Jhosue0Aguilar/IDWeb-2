const bcrypt = require('bcryptjs');
const db = require('../data/usuarios');

const SALT_ROUNDS = 10;
const normalizar = (email) => String(email).trim().toLowerCase();

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Faltan campos obligatorios (email, password)' });
    }

    const emailNorm = normalizar(email);
    if (db.usuarios.some(u => u.email === emailNorm)) {
      return res.status(409).json({ status: 'fail', message: 'El email ya está registrado' });
    }

    // Hash asíncrono con sal (10 salt rounds)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const nuevo = { id: db.getNextId(), email: emailNorm, passwordHash };
    db.usuarios.push(nuevo);

    // Nunca se devuelve el hash
    res.status(201).json({ status: 'success', data: { id: nuevo.id, email: nuevo.email } });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Faltan campos obligatorios (email, password)' });
    }

    const user = db.usuarios.find(u => u.email === normalizar(email));
    const invalido = () => res.status(401).json({ status: 'fail', message: 'Credenciales inválidas' });
    if (!user) return invalido();

    const coincide = await bcrypt.compare(password, user.passwordHash);
    if (!coincide) return invalido();

    // Se regenera la sesión para evitar session fixation
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      res.status(200).json({ status: 'success', message: 'Inicio de sesión exitoso', data: { id: user.id, email: user.email } });
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.status(200).json({ status: 'success', message: 'Sesión cerrada correctamente' });
  });
};

// GET /api/perfil  (protegido por authMiddleware)
exports.perfil = (req, res) => {
  const user = db.usuarios.find(u => u.id === req.session.userId);
  if (!user) return res.status(401).json({ status: 'fail', message: 'Acceso no autorizado' });
  res.status(200).json({ status: 'success', data: { id: user.id, email: user.email } });
};