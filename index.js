const Express = require('express')
const Http = require('http')
const SocketIO = require('socket.io')
const {
    join
} = require('path')

const app = Express()

const server = Http.createServer(app)
app.use(Express.static(join(__dirname, '/')))
const io = SocketIO(server)
server.listen(3000, () => console.log('server running'))

io.sockets.on('connection', (socket) => {
    console.log('alguem conectou!', socket.id)
    socket.on('sum', (data) => {
        const result = data.numero1 + data.numero2
        socket.emit('result', result)
    })
    socket.on('disconnect', () => {
        console.log('alguem desconectou', socket.id)
    })
})