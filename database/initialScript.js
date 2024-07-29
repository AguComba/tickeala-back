import { pool } from '../db.js'
import axios from 'axios'
/**
 * Represents the result of the database query.
 * @typedef {Object} QueryResult
 * @property {number} affectedRows - The number of affected rows.
 * @property {number} insertId - The ID of the inserted row.
 * @property {number} warningCount - The number of warnings.
 * @property {string} message - The message from the server.
 */

/**
 * Get provinces from an API and insert them into the database.
 * this function must be executed only once, to populate the provinces table.
 * @param {Array} provincesArray - An array of provinces to be inserted.
 * @returns {Promise<QueryResult>} The result of the database query.
 * @version 1.0
 * @since 1.0
 * @author Agustin Comba
 * @email agustinlogin@gmail.com
 */
;async (req, res) => {
	const provinces = await axios.get('https://apis.datos.gob.ar/georef/api/provincias')
	// Creo un array de provincias, con el nombre de cada provincia y el status en 1
	const provincesArray = provinces.data.provincias.map((province) => {
		return {
			name: province.nombre,
			api_id: province.id,
			status: 1,
		}
	})
	try {
		const result = await pool.query('INSERT INTO provinces (name, api_id, status) VALUES ?', [provincesArray.map((province) => [province.name, province.api_id, province.status])])
		res.status(200).send(result)
	} catch (error) {
		res.status(500).send(error)
	}
}
