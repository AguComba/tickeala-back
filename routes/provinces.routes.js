import { Router } from 'express'
import { getProvinces, getProvince } from '../controllers/provinces.controller.js'

const router = Router()

router.get('/provinces', getProvinces)

router.get('/provinces/:id', getProvince)

export default router
