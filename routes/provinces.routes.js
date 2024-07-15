import { Router } from 'express'
import { getProvinces } from '../controllers/provinces.controller.js'

const router = Router()

router.get('/provinces', getProvinces)

export default router
