// 1. Seleccionamos el cuerpo de la tabla donde irán los datos
const tbody = document.getElementById('tabla-albums');

// 2. Usamos FETCH para hacer la petición a la API
fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => {
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.status);
        }
        // Convertimos la respuesta a formato JSON
        return response.json();
    })
    .then(data => {
        // 3. Iteramos sobre los datos recibidos
        data.forEach(album => {
            // Creamos una fila (tr) con los datos
            const fila = `
                <tr>
                    <td class="text-center">${album.userId}</td>
                    <td class="text-center">${album.id}</td>
                    <td>${album.title}</td>
                </tr>
            `;
            // Insertamos la fila en el tbody
            tbody.innerHTML += fila;
        });
    })
    .catch(error => {
        // Manejo de errores por si falla la red o la API
        console.error('Hubo un problema:', error);
        tbody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Error al cargar los datos</td></tr>`;
    });