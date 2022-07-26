//HTML References
const lblNewTicket = document.querySelector('#lbl-new-ticket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreate.disabled = true;
});

socket.on('server-last-ticket', (lastTicket) => {
    lblNewTicket.innerText = `Ticket ${lastTicket}`;
})

btnCreate.addEventListener( 'click', () => {
    socket.emit('client-next-ticket', null, ( ticket ) => {
        console.log(ticket);
        lblNewTicket.innerText = ticket;
    });

});