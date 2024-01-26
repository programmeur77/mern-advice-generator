import express from 'express';

import { createUser } from './../controllers/user-controllers.js';

const router = express.Router();

router.post('/create', createUser);

export default router;
