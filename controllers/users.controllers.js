import { ValidationError } from '../errors.js'

export const getUsers = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('obteniendo todos los usuarios')
}

export const getUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('obteniendo un usuario')
}

// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(255) NOT NULL,
// last_name VARCHAR(255) NOT NULL,
// cell_phone VARCHAR(255) NOT NULL,
// email VARCHAR(255) NOT NULL,
// password VARCHAR(255) NOT NULL,
// validated BOOLEAN DEFAULT 0,
// tocken_validation VARCHAR(255),
// type_document INT,
// document_number VARCHAR(255),
// id_city INT,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// status tinyint(1) DEFAULT 1,

const validateUser = (user) => {
	const validations = {
		name: { required: true, type: 'string', max: 255 },
		last_name: { required: true, type: 'string', max: 255 },
		cell_phone: { required: true, type: 'string', max: 255 },
		email: { required: true, type: 'string', max: 255 },
		password: { required: true, type: 'string', max: 255 },
		type_document: { required: true, type: 'number' },
		document_number: { required: true, type: 'string', max: 255 },
		id_city: { required: true, type: 'number' },
	}

	const errors = []

	if (!user || Object.keys(user).length === 0) {
		throw new ValidationError('No se enviaron datos')
	}

	for (const key in validations) {
		if (validations[key]?.required && !user[key]) {
			errors.push(`El campo ${key} es requerido`)
			continue
		}
		if (validations[key]?.type === 'string' && typeof user[key] !== 'string') {
			errors.push(`El campo ${key} debe ser de tipo string`)
		}
		if (validations[key]?.type === 'number' && typeof user[key] !== 'number') {
			errors.push(`El campo ${key} debe ser de tipo number`)
		}
		if (validations[key]?.max && user[key].length > validations[key]?.max) {
			errors.push(`El campo ${key} debe tener como máximo ${validations[key].max} caracteres`)
		}
	}

	if (errors.length > 0) {
		throw new ValidationError(errors)
	}

	return true
}

export const createUser = async (req, res) => {
	try {
		// valido los datos del usuario
		if (validateUser(req.body)) {
			res.json({ user: req.body })
		}
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(400).json({ errors: error.message })
		}
		if (error instanceof Error) {
			res.status(500).json({ errors: error.message })
		}
	}
}

export const updateUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('actualizndo un usuario')
}

export const updateStatusUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('eliminando un usuario')
}
