// Esta es nuestra función principal que carga y aplica todos los filtros
async function aplicarFiltros() {
    try {
        const res = await fetch("http://localhost:3000/objetos");  // aca se busca información a esta dirección de nuestro servidor local
        const datos = await res.json(); // Convertimos la respuesta del servidor a formato JSON 

        // --- Filtros ---
        const filtroNombre = document.getElementById("busquedaNombre").value.toLowerCase(); 
         // Se obtiene el texto que escrito en el buscador y se convierte a minus
        
        const filtroUbicacion = document.getElementById("filtroUbicacion").value;
         // se obbtiene la ubicación seleccionada en el menú desplegable
        
        const ordenValor = document.getElementById("ordenValor").value;
        // Obtiene cómo se quiere ordenar si ascendente o descendente

          // 'filter' crea un nuevo array solo con los objetos que cumplan las condiciones
        let filtrados = datos.filter(obj => {
            const coincideNombre = obj.Nombre.toLowerCase().includes(filtroNombre);
               // Verifica si el nombre del objeto contiene el texto de búsqueda
            
            const coincideUbicacion = filtroUbicacion === "" || obj.Ubicacion === filtroUbicacion;
             // - verifica si no hay filtro de ubicación seleccionado (string vacío) o si la ubicación coincide con la seleccionada
            return coincideNombre && coincideUbicacion;
             // El objeto se incluye solo si cumplen AMBAS condiciones
        });

        // --- Ordenar por valor si corresponde ---
        if (ordenValor === "asc" || ordenValor === "desc") {
            // Solo ordena si el usuario eligió un orden específico
            
            filtrados.sort((a, b) => {
                  // 'sort' ordena el array según la función que le pasemos
                
                const valA = parseInt(a.Valor.split("-")[0]);
                const valB = parseInt(b.Valor.split("-")[0]);
                return ordenValor === "asc" ? valA - valB : valB - valA;
            });
        }

        // --- Mostrar resultados ---
        const contenedor = document.getElementById("cardsContainer");
        // Encontramos el contenedor donde vamos a poner las tarjetas
        
        contenedor.innerHTML = "";
        / borramos cualquier contenido anterior

        filtrados.forEach(obj => {
            contenedor.innerHTML += `
                <div class="card bg-dark text-light m-3 p-3 border border-warning">
                    <h3>${obj.Nombre}</h3>
                    <p><b>Valor:</b> ${obj.Valor}</p>
                    <p><b>Ubicación:</b> ${obj.Ubicacion}</p>
                </div>
                  // Crea una tarjeta HTML con la info del objeto:
            `;
        });

    } catch (error) {
        console.error("Error cargando objetos:", error);
    }
}

//  LLAMAR FUNCIÓN AL INICIAR LA PÁGINA
aplicarFiltros();

//el flujo va de manera que nuestro fetch solicita los items al server en base  alos filtros aplicados y su orden para mostrarlos en pantalla
