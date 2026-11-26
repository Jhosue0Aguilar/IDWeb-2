require('dotenv').config(); // Carga PORT y SESSION_SECRET desde .env

const express = require('express');
const session = require('express-session');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

if (!process.env.SESSION_SECRET) {
  console.error('Falta SESSION_SECRET en el archivo .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,                                // JS del navegador no puede leerla (mitiga XSS)
    secure: process.env.NODE_ENV === 'production', // solo HTTPS en producción
    sameSite: 'lax',                               // mitiga CSRF
    maxAge: 1000 * 60 * 60                         // 1 hora
  }
}));

// Rutas públicas de autenticación
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.get('/api/perfil', authMiddleware, authController.perfil);
app.use('/api/cursos', cursoRoutes);

// Manejo de errores (siempre al final)
app.use(errorHandler);

app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));