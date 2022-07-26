// HTML References
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblCurrentTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lbl-pending');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')){//corroboro que el parametro desktop venga en la url
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('desktop'); //obtengo el valor del parametro desktop que viene en la url
lblDesktop.innerText = desktop;
divAlert.style.display ='none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('server-pending-tickets', pendingTickets => {
    if(pendingTickets === 0){
        lblPending.style.display = 'none';
    }
    else{
        divAlert.style.display ='none';
        lblPending.style.display = '';
        lblPending.innerText = pendingTickets;
    }
})

btnAttend.addEventListener( 'click', () => {
    socket.emit('client-attend-new-ticket', {desktop}, ({ok, ticket, msg}) => {
        if(!ok){
            lblCurrentTicket.innerText = 'Nadie'
            return divAlert.style.display = '';
        }
        lblCurrentTicket.innerText = `Ticket ${ticket.number}`
    })
});