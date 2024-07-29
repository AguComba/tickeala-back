import express from 'express'
import { PORT } from './config.js'

import indexRoutes from './routes/index.routes.js'
import usersRoutes from './routes/user.routes.js'
import provincesRoutes from './routes/provinces.routes.js'
import citiesRoutes from './routes/cities.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use(usersRoutes)
app.use(provincesRoutes)
app.use(citiesRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
