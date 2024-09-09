import { ValidationError, NotFoundError } from '../errors.js'
import { pool } from '../db.js'

export const getCities = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT *, provinces.name as province_name FROM cities JOIN provinces ON cities.province_id = provinces.id')
		if (rows.length === 0) {
			throw new NotFoundError('No se encontraron ciudades')
		}
		//Retorno de las ciudades con el nombre de la provincia y la cantidad de ciudades
		res.json({ count: rows.length, cities: rows })
	} catch (error) {
		if (error instanceof NotFoundError) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(500).json({ error: error.message })
		}
	}
}

export const getCityById = async (req, res) => {
	const { id } = req.params
	try {
		if (!Number.isSafeInteger(parseInt(id)) || parseInt(id) < 1) {
			throw new ValidationError('ID inválido')
		}
		const [rows] = await pool.query(
			`
            SELECT cities.*, provinces.name as province_name 
            FROM cities 
            JOIN provinces ON cities.province_id = provinces.id 
            WHERE cities.id = ?
        `,
			[id]
		)
		if (rows.length === 0) {
			throw new NotFoundError('Ciudad no encontrada')
		}
		res.json({ count: rows.length, city: rows[0] })
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(400).json({ error: error.message })
		}
		if (error instanceof NotFoundError) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(500).json({ error: error.message })
		}
	}
}

export const getCitiesByProvince = async (req, res) => {
	const { provinceId } = req.params
	try {
		if (!Number.isSafeInteger(parseInt(provinceId)) || parseInt(provinceId) < 1) {
			throw new ValidationError(['ID inválido'])
		}
		const cities = await pool.query(
			`
			SELECT cities.*, provinces.name as province_name 
			FROM cities 
			JOIN provinces ON cities.province_id = provinces.id 
			WHERE cities.province_id = ?
		`,
			[provinceId]
		)
		if (cities[0].length === 0) {
			throw new NotFoundError('No se encontraron ciudades')
		}
		res.json({ count: cities[0].length, cities: cities[0] })
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(400).json({ error: error.message })
		}
		if (error instanceof NotFoundError) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(500).json({ error: error.message })
		}
	}
}
