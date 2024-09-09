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

async function seedProvinces() {
	//Agrego una validacion para que no se puedan insertar provincias si ya existen
	const provincesExist = await pool.query('SELECT * FROM provinces')
	if (provincesExist[0].length > 0) {
		console.log('Provinces already exist in the database')
		process.exit(0)
	}
	// Obtengo las provincias de la API
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
		return result
	} catch (error) {
		throw error
	}
}

async function seedCities() {
	//Agrego una validacion para que no se puedan insertar ciudades si ya existen
	const citiesExist = await pool.query('SELECT * FROM cities')
	if (citiesExist[0].length > 0) {
		console.log('Cities already exist in the database')
		process.exit(0)
	}

	// Obtengo las provincias de la base de datos
	const provincesResult = await pool.query('SELECT id, api_id FROM provinces')
	// Creo un mapa de provincias, donde la clave es el api_id de la provincia y el valor es el id de la provincia
	const provincesMap = new Map(provincesResult[0].map((province) => [province.api_id, province.id]))

	console.log(provincesMap)
	const cities = await axios.get('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000')
	const citiesArray = cities.data.localidades.map((city) => {
		return {
			name: city.nombre,
			zip_code: '00',
			api_id: city.id,
			province_id: provincesMap.get(city.provincia.id),
			status: 1,
		}
	})
	try {
		const result = await pool.query('INSERT INTO cities (name, zip_code, api_id, province_id, status) VALUES ?', [citiesArray.map((city) => [city.name, city.zip_code, city.api_id, city.province_id, city.status])])
		return result
	} catch (error) {
		throw error
	}
}

//Creo una funcion que se encargue de ejecutar las funciones de seedProvinces y seedCities
async function seed() {
	try {
		await seedProvinces()
		await seedCities()
		// Devuelvo un mensaje de exito
		console.log('Database seeded successfully')
		// Finalizo la ejecucion del script
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

seed()
