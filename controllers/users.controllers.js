export const getUsers = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('obteniendo todos los usuarios')
}

export const getUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('obteniendo un usuario')
}

export const createUser = async (req, res) => {
	console.log(req.body)
	res.send('creando un usaurio')
}

export const updateUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('actualizndo un usuario')
}

export const updateStatusUser = async (req, res) => {
	// const [rows] = await pool.query('SELECT * FROM users')
	res.send('eliminando un usuario')
}
