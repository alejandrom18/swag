document.addEventListener("DOMContentLoaded", () => {
    // 1. Referencias exactas a tus IDs de register.php
    const selectPais = document.getElementById("selectCountry");
    const selectEstado = document.getElementById("selectState");
    const inputPhone = document.querySelector('input[name="phone"]'); // Buscamos por name ya que no tiene ID
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");

    if (!inputPhone) return; // Seguridad

    // 2. Inicializar intl-tel-input
    const iti = window.intlTelInput(inputPhone, {
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js",
    });

    // 3. Llenar Select de Países
    const populateCountries = () => {
        if (typeof paisesData === 'undefined') return;
        selectPais.innerHTML = '<option value="" selected disabled>Selecciona un país</option>';
        paisesData.forEach((item, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.text = item.pais;
            selectPais.add(option);
        });
    };
    populateCountries();

    // 4. Lógica de Estados
    const updateStates = (index) => {
        selectEstado.innerHTML = '<option value="">Selecciona un estado</option>';
        if (index !== "" && paisesData[index]) {
            paisesData[index].estados.forEach(estado => {
                let option = document.createElement("option");
                option.text = estado;
                selectEstado.add(option);
            });
            selectEstado.disabled = false;
        } else {
            selectEstado.disabled = true;
        }
    };

    selectPais.addEventListener("change", (e) => updateStates(e.target.value));

    // 5. Sincronización Bandera -> Select
    inputPhone.addEventListener("countrychange", () => {
        const countryData = iti.getSelectedCountryData();
        const foundIndex = paisesData.findIndex(p => 
            countryData.name.includes(p.pais) || p.pais.includes(countryData.name.split(' (')[0])
        );
        if (foundIndex !== -1) {
            selectPais.value = foundIndex;
            updateStates(foundIndex);
        }
    });

    // 6. Botón NEXT (Validación + Cambio de paso)
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const fields = step1.querySelectorAll("[required]");
            let valid = true;
            for (let f of fields) {
                if (!f.checkValidity()) {
                    f.reportValidity();
                    valid = false;
                    return;
                }
            }

            if (!iti.isValidNumber()) {
                inputPhone.style.border = "2px solid var(--accent)";
                alert("Número de teléfono no válido.");
                return;
            }

            step1.style.display = "none";
            step2.style.display = "block";
            window.scrollTo(0, 0); // Sube al inicio en móviles
        });
    }

    // 7. Botón BACK (Corregido)
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            step2.style.display = "none";
            step1.style.display = "block";
            window.scrollTo(0, 0);
        });
    }
});