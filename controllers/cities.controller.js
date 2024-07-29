import { ValidationErrror, NotFoundError } from '../errors.js'
import { pool } from '../db.js'
import axios from 'axios'

// * Obtiene todas las localidades de la api de georef ordenadas por nombre
// ! https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000&aplanar=true
// * Obtiene todas las localidades de la api de georef ordenadas por nombre y por provincia
// ! https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000&provincia=06

export const getCities = async (req, res) => {
	try {
		const { data } = await axios.get('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000&aplanar=true')
		const localidades = data.localidades
		const [rows] = await pool.query('SELECT * FROM provinces')
		const provincias = rows

		// Relaciono las localidades con sus provincias
		// localidades.forEach((localidad) => {
		// 	localidad.provincia = provinciasObj[localidad.provincia.id]
		// })
		console.log(provincias)
		// Armo una query para insertar todas las localidades en la base de datos y relacionarlas con su provincia

		// const query = 'INSERT INTO cities (name, zip_code, api_id, province_id) VALUES ?'
		// const values = localidades.map(localidad => [localidad.id, localidad.nombre, '0000', localidad.id, localidad.provincia_id])

		res.status(200).json(localidades)
	} catch (error) {
		res.status(500).json({ error })
	}
}
