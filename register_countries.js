document.addEventListener("DOMContentLoaded", () => {
    const selectPais = document.getElementById("selectCountry");
    const selectEstado = document.getElementById("selectState");
    const inputPhone = document.querySelector("#phone");

    // --- 1. Inicializar intl-tel-input ---
    const iti = window.intlTelInput(inputPhone, {
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => {
                    callback(data.country_code);
                    // Guardamos el código para usarlo luego
                    window.detectedCountryCode = data.country_name; 
                })
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js",
    });

    // --- 2. Llenar el Select de Países ---
    selectPais.innerHTML = '<option value="" selected disabled>Selecciona un país</option>';
    paisesData.forEach((item, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = item.pais;
        selectPais.add(option);
    });

    // --- 3. FUNCIÓN MÁGICA: Sincronizar de Bandera a Select ---
    const syncFlagToSelect = () => {
        const countryData = iti.getSelectedCountryData();
        // Buscamos el nombre del país en tu JSON (paisesData)
        // Nota: Algunos nombres pueden variar (ej: "Spain" vs "España"), 
        // por eso buscamos una coincidencia parcial o exacta.
        const foundIndex = paisesData.findIndex(p => 
            p.pais.toLowerCase() === countryData.name.split(' (')[0].toLowerCase() || 
            p.pais.includes(countryData.name)
        );

        if (foundIndex !== -1) {
            selectPais.value = foundIndex;
            updateStates(foundIndex);
        }
    };

    // --- 4. FUNCIÓN: Cargar Estados ---
    const updateStates = (index) => {
        selectEstado.innerHTML = '<option value="">Selecciona un estado</option>';
        if (index !== "") {
            const estados = paisesData[index].estados;
            estados.forEach(estado => {
                let option = document.createElement("option");
                option.text = estado;
                selectEstado.add(option);
            });
            selectEstado.disabled = false;
        }
    };

    // --- 5. Eventos de escucha ---

    // Si cambias el país manualmente en el SELECT -> Cambia la Bandera
    selectPais.addEventListener("change", (e) => {
        const index = e.target.value;
        updateStates(index);
        
        // Opcional: Cambiar la bandera para que coincida con el select
        const paisNombre = paisesData[index].pais;
        iti.setCountry(iti.getCountryData().find(c => c.name.includes(paisNombre))?.iso2 || 'us');
    });

    // Si cambias la BANDERA -> Cambia el Select (después de que ITI cargue)
    inputPhone.addEventListener("countrychange", syncFlagToSelect);

    // Ejecutar una vez al inicio después de un pequeño delay para que ITI detecte la IP
    setTimeout(syncFlagToSelect, 1000);
});