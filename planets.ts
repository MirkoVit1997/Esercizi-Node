import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from './controllerPlanets';

const router = express.Router();

// GET /api/planets
router.get('/', getAll);

// GET /api/planets/:id
router.get('/:id', getOneById);

// POST /api/planets
router.post('/', create);

// PUT /api/planets/:id
router.put('/:id', updateById);

// DELETE /api/planets/:id
router.delete('/:id', deleteById);

export default router;