import axios from 'axios'
import { pool } from '../db.js'

export const getProvinces = () => console.log('obtiene pcias')

export const getProvince = async (req, res) => {
	// const [ rows ] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
	res.send('obteniendo una provincia')
}

export const createProvince = async (req, res) => {
	console.log(req.body)
	res.send('creando una provincia')
}

export const updateProvince = async (req, res) => {
	res.send('actualizando una provincia')
}

export const deleteProvince = async (req, res) => {
	res.send('eliminando una provincia')
}
