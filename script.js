document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('ul input[type="checkbox"]');
    const sendEmailButton = document.getElementById('sendEmail');
    const unselectAllButton = document.getElementById('unselectAll');
    const previewModal = document.getElementById('previewModal');
    const emailModal = document.getElementById('emailModal');

    // Location data
    const locationData = {
        'altabrisa': {
            address: 'Plaza Altabrisa, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9989,-92.9445'
        },
        'americas': {
            address: 'Plaza Americas, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9876,-92.9301'
        },
        'angeles': {
            address: 'Los Ángeles #123, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9912,-92.9334'
        },
        'centro': {
            address: 'Centro #456, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9898,-92.9199'
        },
        'cristal': {
            address: 'Plaza Cristal, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9845,-92.9367'
        },
        'galerias': {
            address: 'Galerías Tabasco, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9923,-92.9456'
        },
        'deportiva': {
            address: 'Av. Deportiva #345, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9867,-92.9289'
        },
        'guayabal': {
            address: 'Calle Guayabal #678, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9934,-92.9412'
        },
        'olmeca': {
            address: 'Av. Olmeca #901, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9878,-92.9345'
        },
        'pista': {
            address: 'Av. Principal #432, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9901,-92.9378'
        },
        'usuma': {
            address: 'Calle Usumacinta #765, Villahermosa',
            amount: '$200',
            model: 'cafeteria',
            coords: '17.9856,-92.9323'
        },
        'movil-deportiva': {
            address: 'Av. Deportiva #098, Villahermosa',
            amount: '$200',
            model: 'movil',
            coords: '17.9867,-92.9289'
        },
        'movil-venta': {
            address: 'Carretera La Venta Km 2',
            amount: '$200',
            model: 'movil',
            coords: '18.0012,-92.9501'
        },
        'walmart-carrizal': {
            address: 'Av. Carrizal #321, Villahermosa',
            amount: '$200',
            model: 'expres',
            coords: '17.9845,-92.9367'
        },
        'walmart-deportiva': {
            address: 'Av. Deportiva #654, Villahermosa',
            amount: '$200',
            model: 'expres',
            coords: '17.9867,-92.9289'
        },
        'walmart-universidad': {
            address: 'Av. Universidad #987, Villahermosa',
            amount: '$200',
            model: 'expres',
            coords: '17.9923,-92.9456'
        }
    };

    // Modal handlers
    document.getElementById('closePreview').addEventListener('click', () => {
        previewModal.style.display = 'none';
        emailModal.style.display = 'block';
    });

    document.getElementById('confirmEmail').addEventListener('click', () => {
        const emailInput = document.getElementById('emailInput');
        const recipientEmail = emailInput.value.trim();
        
        if (!recipientEmail) {
            alert('Por favor ingrese un correo electrónico');
            return;
        }

        const mailtoLink = `mailto:${recipientEmail}?subject=Rutas Café La Cabaña - ${new Date().toLocaleDateString('es-MX')}&body=` +
            encodeURIComponent(
                `Buenos días,\n\n` +
                `Por medio del presente se autoriza el gasto para las siguientes ubicaciones:\n\n` +
                `${document.getElementById('previewContent').textContent}\n\n` +
                `Saludos cordiales.`
            );
        emailModal.style.display = 'none';
        window.location.href = mailtoLink;
    });

    document.getElementById('cancelEmail').addEventListener('click', () => {
        emailModal.style.display = 'none';
    });

    document.getElementById('warningOk').addEventListener('click', () => {
        document.getElementById('warningModal').style.display = 'none';
    });

    // Checkbox handlers
    selectAllCheckbox.addEventListener('change', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        saveSelections();
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveSelections();
            updateSelectAllCheckbox();
        });
    });

    unselectAllButton.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectAllCheckbox.checked = false;
        saveSelections();
    });

    // Main email functionality
    sendEmailButton.addEventListener('click', () => {
        const selectedLocations = [];
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const locationId = checkbox.id;
                const locationName = checkbox.nextElementSibling.textContent;
                const data = locationData[locationId];
                selectedLocations.push(
                    `📍 ${locationName}\n` +
                    `   • Monto autorizado: ${data.amount}\n` +
                    `   • Dirección: ${data.address}\n` +
                    `   • Ver en Maps: https://www.google.com/maps?q=${data.coords}\n` +
                    `   • Modelo: ${data.model.charAt(0).toUpperCase() + data.model.slice(1)}\n`
                );
            }
        });

        if (selectedLocations.length === 0) {
            document.getElementById('warningModal').style.display = 'block';
            return;
        }

        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = selectedLocations.join('\n');
        previewModal.style.display = 'block';
    });

    document.getElementById('confirmEmail').addEventListener('click', () => {
        const emailInput = document.getElementById('emailInput');
        const recipientEmail = emailInput.value.trim();
        
        if (!recipientEmail) {
            alert('Por favor ingrese un correo electrónico');
            return;
        }

        const mailtoLink = `mailto:${recipientEmail}?subject=Rutas Café La Cabaña - ${new Date().toLocaleDateString('es-MX')}&body=` +
            encodeURIComponent(
                `Buenos días,\n\n` +
                `Por medio del presente se autoriza el gasto para las siguientes ubicaciones:\n\n` +
                `${document.getElementById('previewContent').textContent}\n\n` +
                `Saludos cordiales.`
            );
        emailModal.style.display = 'none';
        window.location.href = mailtoLink;
    });

    // Utility functions
    function saveSelections() {
        const selections = {};
        checkboxes.forEach(checkbox => {
            selections[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('locationSelections', JSON.stringify(selections));
    }

    function loadSelections() {
        const savedSelections = JSON.parse(localStorage.getItem('locationSelections') || '{}');
        checkboxes.forEach(checkbox => {
            checkbox.checked = savedSelections[checkbox.id] || false;
        });
        updateSelectAllCheckbox();
    }

    function updateSelectAllCheckbox() {
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    }

    // Initialize
    loadSelections();
});