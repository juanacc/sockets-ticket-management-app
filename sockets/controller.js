const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

exports.socketController = socket => {
    socket.emit('server-last-ticket', ticketControl.last);
    socket.emit('server-actual-state', ticketControl.last4);
    socket.emit('server-pending-tickets', ticketControl.tickets.length);
    
    socket.on('client-next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('server-pending-tickets', ticketControl.tickets.length);
    })

    socket.on('client-attend-new-ticket', ({desktop}, callback) => {
        if(!desktop){
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            })
        }
        const ticket = ticketControl.attendTicket(desktop);
        socket.broadcast.emit('server-actual-state', ticketControl.last4);
        socket.emit('server-pending-tickets', ticketControl.tickets.length);//emito al que tomo un ticket
        socket.broadcast.emit('server-pending-tickets', ticketControl.tickets.length);//emito a todos

        if(!ticket){
            callback({
                ok:false,
                msg: "Ya no hay tickets pendientes"
            });
        }
        else{
            callback({
                ok:true,
                ticket
            })
        }
    })

}