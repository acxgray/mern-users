import express from "express"
import { GetAllUsers, CreateUser, UpdateUser, DeleteUser } from '../controller/UserController.js'

const router = express.Router();

router.get('/', GetAllUsers);

router.post('/', CreateUser);

// update
router.put('/:id', UpdateUser);

router.delete('/:id', DeleteUser);


export default router;