module.exports = (io) => {
    io.on('connection', (socket) => {
        var address = socket.request.connection.remoteAddress;
        console.log(`Socket ID: ${socket.id} with address: ${address} is connected`);
        socket.on('disconnect', () => {
            // Need to find the correct socketId and SEND_STATUS_DEVICE_TO_FRONT for turning on or off
            console.log(`Socket ID: ${socket.id} with address: ${address} has been disconnected`);
        });
    });
};
