const express = require('express')
const app = epress()
app.use(express.json())

const modelsRoutes = require('./modules/models/models.routes')

app.user('/api', modelsRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))