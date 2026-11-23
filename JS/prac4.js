// Seleccionamos los elementos del DOM
const btnBuscar = document.getElementById('btnBuscar');
const inputAlbumId = document.getElementById('inputAlbumId');
const contenedorResultados = document.getElementById('contenedorResultados');

// Escuchamos el clic del botón
btnBuscar.addEventListener('click', () => {
    const albumId = inputAlbumId.value;
    
    // Limpiamos resultados anteriores y mostramos mensaje de carga
    contenedorResultados.innerHTML = '<p>Cargando...</p>';

    // Hacemos la petición FETCH añadiendo el parámetro ?albumId= 
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(response => response.json())
        .then(data => {
            contenedorResultados.innerHTML = ''; // Limpiamos el "Cargando..."

            // Si no hay resultados para ese ID
            if (data.length === 0) {
                contenedorResultados.innerHTML = '<p class="text-danger">No se encontraron fotos para este Album ID.</p>';
                return;
            }

            // Recorremos las fotos recibidas
            data.forEach(foto => {
                // Creamos el HTML de la tarjeta con los datos requeridos
                // Nota: Para la imagen usamos foto.thumbnailUrl o foto.url
                const tarjetaHTML = `
                    <div class="foto-card">
                        <img src="${foto.url}" alt="Imagen de la foto">
                        <div>
                            <h5 class="mb-1">Foto ${foto.id}</h5>
                            <p class="text-muted mb-1" style="font-size: 0.9rem;">
                                Album ID: ${foto.albumId} - Foto ID: ${foto.id}
                            </p>
                            <p class="mb-0">${foto.title}</p>
                        </div>
                    </div>
                `;
                // Lo agregamos al contenedor
                contenedorResultados.innerHTML += tarjetaHTML;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            contenedorResultados.innerHTML = '<p class="text-danger">Hubo un error al buscar las fotos.</p>';
        });
});