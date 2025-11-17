// Función principal que carga y aplica todos los filtros
async function aplicarFiltros() {
    try {
        const res = await fetch("http://localhost:3000/objetos");
        const datos = await res.json();

        // --- Filtros ---
        const filtroNombre = document.getElementById("busquedaNombre").value.toLowerCase();
        const filtroUbicacion = document.getElementById("filtroUbicacion").value;
        const ordenValor = document.getElementById("ordenValor").value;

        let filtrados = datos.filter(obj => {
            const coincideNombre = obj.Nombre.toLowerCase().includes(filtroNombre);
            const coincideUbicacion = filtroUbicacion === "" || obj.Ubicacion === filtroUbicacion;
            return coincideNombre && coincideUbicacion;
        });

        // --- Ordenar por valor si corresponde ---
        if (ordenValor === "asc" || ordenValor === "desc") {
            filtrados.sort((a, b) => {
                const valA = parseInt(a.Valor.split("-")[0]);
                const valB = parseInt(b.Valor.split("-")[0]);
                return ordenValor === "asc" ? valA - valB : valB - valA;
            });
        }

        // --- Mostrar resultados ---
        const contenedor = document.getElementById("cardsContainer");
        contenedor.innerHTML = "";

        filtrados.forEach(obj => {
            contenedor.innerHTML += `
                <div class="card bg-dark text-light m-3 p-3 border border-warning">
                    <h3>${obj.Nombre}</h3>
                    <p><b>Valor:</b> ${obj.Valor}</p>
                    <p><b>Ubicación:</b> ${obj.Ubicacion}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error cargando objetos:", error);
    }
}

// 🔥 LLAMAR FUNCIÓN AL INICIAR LA PÁGINA
aplicarFiltros();
