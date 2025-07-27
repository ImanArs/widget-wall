
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const widgetsRoute = require('./routes/widgets')
const { setupWebSocket } = require('./ws/socket')

const app = express()
app.use(cors())
app.use('/widgets', widgetsRoute)

const server = http.createServer(app)
const wss = new WebSocketServer({ server })
setupWebSocket(wss)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
