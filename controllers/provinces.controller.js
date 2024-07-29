import { ValidationErrror, NotFoundError } from '../errors.js'
import { pool } from '../db.js'

export const getProvinces = async (req, res) => {
	const [rows] = await pool.query('SELECT * FROM provinces')
	res.status(200).json(rows)
}

export const getProvince = async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		if (!Number.isSafeInteger(id) || id < 1) {
			throw new ValidationErrror('Invalid id')
		}
		const [rows] = await pool.query('SELECT * FROM provinces WHERE id = ?', [req.params.id])
		if (rows.length === 0) {
			throw new NotFoundError('Province not found')
		}
		res.status(200).json(rows)
	} catch (error) {
		if (error instanceof ValidationErrror) {
			res.status(400).json({ error: error.message })
		} else if (error instanceof NotFoundError) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'Internal server error' })
		}
	}
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
