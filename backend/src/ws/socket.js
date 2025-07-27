const { updateWidgets } = require('../lib/data')

function setupWebSocket(wss) {
  wss.on('connection', (ws) => {
    console.log('[WS] Client connected')

    const interval = setInterval(() => {
      const updates = updateWidgets()
      updates.forEach(update => {
        ws.send(JSON.stringify(update))
      })
    }, 500)

    ws.on('close', () => {
      console.log('[WS] Client disconnected')
      clearInterval(interval)
    })
  })
}

module.exports = { setupWebSocket }
