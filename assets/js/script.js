async function cargarObjetos() {
    try {
        const res = await fetch("http://localhost:3000/objetos");
        const datos = await res.json();

        const contenedor = document.getElementById("cardsContainer");
        contenedor.innerHTML = "";

        datos.forEach(obj => {
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

cargarObjetos();
