
let formulario = document.querySelector('form');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const opciones = document.getElementsByName('opcion');

    let opcionSeleccionada = null;

    opciones.forEach(opcion => {
        if (opcion.checked) {
            opcionSeleccionada = opcion.value;
        }
    });

    if (opcionSeleccionada !== null) {
        switch (opcionSeleccionada) {
            case "mostrar":
                window.location.href = 'html/mostrar.html';
                break;
            case "crear":
                window.location.href = 'html/crear.html';
                break;
            case "editar":
                window.location.href = 'html/editar.html';
                break;
            case "eliminar":
                window.location.href = 'html/eliminar.html';
                break;

            default:
                break;
        }

    } else {
        alert('Por favor, selecciona una opción.');
    }
});
