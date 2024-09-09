import { Router } from 'express'
import { getCities, getCityById, getCitiesByProvince } from '../controllers/cities.controller.js'

const router = Router()

router.get('/cities', getCities)

router.get('/cities/:id', getCityById)

router.get('/provinces/:provinceId/cities', getCitiesByProvince)

export default router
