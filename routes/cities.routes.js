import { Router } from 'express'
import { getCities } from '../controllers/cities.controller.js'

const router = Router()

router.get('/cities', getCities)

router.get('/cities/:id', (req, res) => {
	res.send('listando una ciudad')
})

export default router
