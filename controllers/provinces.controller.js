import { ValidationError, NotFoundError } from '../errors.js'
import { pool } from '../db.js'

/**
 * Retrieves all provinces from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Responds with a JSON array of provinces.
 *
 * @example
 * // Example request:
 * // GET /provinces
 * // Example response:
 * // [
 * //   { "id": 1, "name": "Province1" },
 * //   { "id": 2, "name": "Province2" }
 * // ]
 *
 * @throws {Error} If there is an issue with the database query.
 */
export const getProvinces = async (req, res) => {
	const [rows] = await pool.query('SELECT * FROM provinces')
	res.json({ count: rows.length, provinces: rows })
}

/**
 * Retrieves a specific province by its ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Responds with a JSON object of the province or an error message.
 *
 * @example
 * // Example request:
 * // GET /provinces/1
 * // Example response:
 * // { "id": 1, "name": "Province1" }
 *
 * @throws {ValidationError} If the provided ID is not a valid integer.
 * @throws {NotFoundError} If no province is found with the provided ID.
 * @throws {Error} If there is an issue with the database query or an internal server error.
 * @author [Tu Nombre] <acombadev@gmail.com>
 */
export const getProvince = async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		if (!Number.isSafeInteger(id) || id < 1) {
			throw new ValidationError('Invalid id')
		}
		const [rows] = await pool.query('SELECT * FROM provinces WHERE id = ?', [req.params.id])
		if (rows.length === 0) {
			throw new NotFoundError('Province not found')
		}
		res.json({ coutn: rows.length, province: rows[0] })
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(400).json({ error: error.message })
		} else if (error instanceof NotFoundError) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}

// export const createProvince = async (req, res) => {
// 	console.log(req.body)
// 	res.send('creando una provincia')
// }

// export const updateProvince = async (req, res) => {
// 	res.send('actualizando una provincia')
// }

// export const deleteProvince = async (req, res) => {
// 	res.send('eliminando una provincia')
// }
