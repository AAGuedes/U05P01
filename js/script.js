/**
 * Window on load
 */
window.onload = function () {
    var day = new Date().getDate();
    if (day >= 1 && day <= 9) {
        day = '0' + day;
    }
    var month = (new Date().getMonth() + 1);
    var year = new Date().getFullYear();
    // Datepicker format
    //var today =  day + '/' + month + '/' + year;
    var today = year + '-' + month + '-' + day;
    document.getElementById('hotel').value = 'Hotel o Destino';
    document.getElementById("date").value = today;
    document.getElementById("date").min = today;
    document.getElementById('nights').value = '0 Noches';
    document.getElementById('guests').value = '0 rooms & 0 guests';
}

/**
* Popover para la fecha de entrada (OPCIONAL)
* Para utilizar datepicker, sera necesario cambiar el input en el HTML y
* el formato en el window.onload
*/
$(document).ready(function () {
    // Datepicker
    $('[data-toggle="popover-date"]').datepicker({
        format: 'dd/mm/yyyy',
        startDate: 'today',
    }).on('change', function () {
        $('.datepicker').hide();
    });
});

/**
 * Popover para el número de noches
 */
$(document).ready(function () {
    $('[data-toggle="popover-nights"]').popover({
        html: true,
        placement: 'bottom',
        content: function () {
            return '<div id="option">' +
                        '<span class="text-secondary font-weight-bold">COMUNES</span>' +
                        '<a class="dropdown-item">4 Noches</a>' +
                        '<a class="dropdown-item">7 Noches</a>' +
                        '<a class="dropdown-item">10 Noches</a>' +
                        '<a class="dropdown-item">14 Noches</a>' +
                        '<div class="dropdown-divider"></div>' +
                        '<span class="text-secondary font-weight-bold">DIARIAS</span>' +
                        '<a class="dropdown-item">1 Noche</a>' +
                        '<a class="dropdown-item">2 Noches</a>' +
                        '<a class="dropdown-item">3 Noches</a>' +
                        '<a class="dropdown-item">4 Noches</a>' +
                        '<a class="dropdown-item">5 Noches</a>' +
                        '<a class="dropdown-item">6 Noches</a>' +
                        '<a class="dropdown-item">7 Noches</a>' +
                        '<a class="dropdown-item">8 Noches</a>' +
                    '</div>'
        }
    }).on('shown.bs.popover', function () {
        document.querySelectorAll('#option .dropdown-item').forEach(option => {
            option.addEventListener('click', () => {
                document.getElementById('nights').value = option.textContent;
                $("#nights").popover('hide');
            })
        })
    })
});

const roomhtml = 
        '<div class="d-flex flex-inline justify-content-between room">' +
            '<p><span>1</span> Habitación<a href="#" class="ml-4 remove-room">X</a></p>' +
        '</div>' +
        '<div class="d-flex flex-inline form-group justify-content-between">' +
            '<label class="mr-4" for="adults">Adultos:</label>' +
            '<input class="border rounded adults" type="number" value="1" min="0" max="4">' +
        '</div>' +
        '<div class="d-flex flex-row form-group justify-content-between">' +
            '<label for="childs">Niños:</label>' +
            '<input class="border rounded childs" type="number" value="0" min="0" max="3">' +
        '</div>';

/**
 * Popover para el número de habitaciones
 */
$(document).ready(function () {
    $('[data-toggle="popover-guests"]').popover({
        html: true,
        sanitize: false,
        placement: 'bottom',
        content: function () {
            return '<form class="d-flex flex-row">' +
                        '<div id="room-container" class="d-flex flex-row">' +   // #ROOM-CONTAINER
                            '<div class="flex-column border-right pr-2 room">' +   // .ROOM
                                '<div class="d-flex flex-inline justify-content-between room">' +
                                    '<p><span>1</span> Habitación</p>' +
                                '</div>' +
                                '<div class="d-flex flex-inline form-group justify-content-between">' +
                                    '<label class="mr-4" for="adults">Adultos:</label>' +
                                    '<input class="border rounded adults" type="number" value="1" min="0" max="4">' +
                                '</div>' +
                                '<div class="d-flex flex-row form-group justify-content-between">' +
                                    '<label for="childs">Niños:</label>' +
                                    '<input class="border rounded childs" type="number" value="0" min="0" max="3">' +
                                '</div>' +
                                '<div class="d-flex flex-row form-group justify-content-between childage-container">' + // .CHILDAGE-CONTAINER
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div id="room-menu" class="flex-column flex-column">' +    // #ROOM-MENU
                            '<a class="dropdown-item" id="add-room">ADD ROOM</a>' +
                            '<a class="dropdown-item" id="done">DONE</a>' +
                        '</div>' +
                    '</form>'
        }
    // Cuando se carga el popover ejecuta la funcion anonima
    }).on('shown.bs.popover', function () {
        document.querySelectorAll('#room-menu a').forEach(a => {
            a.addEventListener('click', () => {
                // Agregar habitacion
                if (a.id == 'add-room') {
                    // Solo crea hasta un maximo de 4 habitaciones
                    if(document.getElementById('room-container').children.length < 4) {
                        // Esta parte crea la habitacion nueva
                        let newroom = document.createElement('div');
                        newroom.className = 'flex-comun border-right pl-2 pr-2';
                        newroom.innerHTML = roomhtml;
                        document.getElementById('room-container').appendChild(newroom);
                        // Esta parte enumera las habitaciones
                        for(let i = 0; i < document.getElementById('room-container').children.length; i++) {
                            document.getElementById('room-container').children[i].firstElementChild.firstChild.firstChild.innerHTML = i + 1;
                        }
                    }
                }
                // Terminar
                if (a.id == 'done') {
                    document.querySelectorAll('.adults').forEach(ad => {
                        console.log('A:' + ad.value);
                    })
                    document.querySelectorAll('.childs').forEach(ch => {
                        console.log('C: ' + ch.value);
                    })
                }
            })
        });

        // Este querySelectorAll solo funciona para la primara habitacion, no para las agregadas posteriormente
        document.querySelectorAll('.childs').forEach(c => {
            c.addEventListener('change', () => {
                let childnum = document.querySelectorAll('.childage').length;
                console.log(childnum)
                if(childnum < c.value) {
                    document.getElementById('room-container').firstChild.lastElementChild.appendChild(document.createElement('input'));
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.className = 'border rounded childage';
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.type = 'number';
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.value = 0;
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.min = 0;
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.max = 12;
                } else {
                    document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.remove();
                }
            })
        })

        // Colisiona con el anterior y ocasiona un mal funcionamiento a la hora de agregar/quitar menores
        // // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        // // Para los cambios posteriores necesitamos el MutationObserver (no encontre otra forma de hacerlo)
        // const targetNode = document.getElementById('room-container');
        // const config = { attributes: true, childList: true, subtree: true };
        // const childcallback = function(observer) {
        //     // Agrega o quita los inputs para la edad de los niños
        //     document.querySelectorAll('.childs').forEach(c => {
        //         c.addEventListener('change', () => {
        //             if(document.querySelectorAll('.childage').length < c.value) {
        //                 document.getElementById('room-container').firstChild.lastElementChild.appendChild(document.createElement('input'));
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.className = 'border rounded childage';
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.type = 'number';
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.value = 0;
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.min = 0;
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.max = 12;
        //             } else {
        //                 document.getElementById('room-container').firstChild.lastElementChild.lastElementChild.remove();
        //             }    
        //         })
        //     })
        //     // Escucha las X para quitar la habitacion
        //     document.querySelectorAll('.remove-room').forEach(x => {
        //         x.addEventListener('click', () => {
        //             console.log(this)
        //         })
        //     })
        // };
        // const observer = new MutationObserver(childcallback);
        // observer.observe(targetNode, config);
    })
});

// Incompleto
document.getElementById('buscar').addEventListener('click', () => {
    console.log('RESERVA HOTELERA');
    console.log('Destino: ' + document.getElementById('hotel').value);
    console.log('Fecha de entrada: ' + document.getElementById("date").value);
    console.log('Numero de noches: ' + document.getElementById('nights').value);
})