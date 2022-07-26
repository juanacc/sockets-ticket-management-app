
// Referencias del HTML
const lblOnline  = document.querySelector('#lbl-online');
const lblOffline = document.querySelector('#lbl-offline');
const txtMessage = document.querySelector('#txt-mensaje');
const btnSend  = document.querySelector('#btn-enviar');


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});


socket.on('server-send-message', (payload) => {
    console.log( payload )
})


btnSend.addEventListener( 'click', () => {

    const message = txtMessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    
    socket.emit('client-send-message', payload, ( id ) => {
        console.log('Respuesta del server', id );
    });

});