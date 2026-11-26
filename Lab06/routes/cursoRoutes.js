const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas privadas académicas: requieren sesión iniciada.
// (Para dejar la lectura pública, mueve authMiddleware solo a post/put/delete)
router.use(authMiddleware);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
