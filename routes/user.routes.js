import { Router } from 'express'
import { getUsers, getUser, createUser, updateUser, updateStatusUser } from '../controllers/users.controllers.js'
const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.put('/usersStatus/:id', updateStatusUser)

export default router
