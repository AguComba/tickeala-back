import { pool } from '../db.js'
import axios from 'axios'

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
	res.send(provincesArray)
	try {
		// Inserto las provincias en la base de datos
		const result = await pool.query('INSERT INTO provinces (name, api_id, status) VALUES ?', [provincesArray.map((province) => [province.name, province.api_id, province.status])])
		res.status(200).send(result)
	} catch (error) {
		res.status(500).send(error)
	}
}
