document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('ul input[type="checkbox"]');
    const sendEmailButton = document.getElementById('sendEmail');
    const unselectAllButton = document.getElementById('unselectAll');

    // Location data
    const locationData = {
        'altabrisa': {
            address: 'Plaza Altabrisa, Villahermosa',
            amount: '$200'
        },
        'americas': {
            address: 'Plaza Americas, Villahermosa',
            amount: '$200'
        },
        'angeles': {
            address: 'Los Ángeles #123, Villahermosa',
            amount: '$200'
        },
        'centro': {
            address: 'Centro #456, Villahermosa',
            amount: '$200'
        },
        'cristal': {
            address: 'Plaza Cristal, Villahermosa',
            amount: '$200'
        },
        'galerias': {
            address: 'Galerías Tabasco, Villahermosa',
            amount: '$200'
        },
        'deportiva': {
            address: 'Av. Deportiva #345, Villahermosa',
            amount: '$200'
        },
        'guayabal': {
            address: 'Calle Guayabal #678, Villahermosa',
            amount: '$200'
        },
        'olmeca': {
            address: 'Av. Olmeca #901, Villahermosa',
            amount: '$200'
        },
        'pista': {
            address: 'Av. Principal #432, Villahermosa',
            amount: '$200'
        },
        'usuma': {
            address: 'Calle Usumacinta #765, Villahermosa',
            amount: '$200'
        },
        'movil-deportiva': {
            address: 'Av. Deportiva #098, Villahermosa',
            amount: '$200'
        },
        'movil-venta': {
            address: 'Carretera La Venta Km 2',
            amount: '$200'
        },
        'walmart-carrizal': {
            address: 'Av. Carrizal #321, Villahermosa',
            amount: '$200'
        },
        'walmart-deportiva': {
            address: 'Av. Deportiva #654, Villahermosa',
            amount: '$200'
        },
        'walmart-universidad': {
            address: 'Av. Universidad #987, Villahermosa',
            amount: '$200'
        }
    };

    // Checkbox event handlers
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

    // Warning modal handler
    document.getElementById('warningOk').addEventListener('click', () => {
        document.getElementById('warningModal').style.display = 'none';
    });

    // Main send email functionality
    sendEmailButton.addEventListener('click', () => {
        const selectedLocations = [];
        const today = new Date().toLocaleDateString('es-MX');
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const locationId = checkbox.id;
                const locationName = checkbox.nextElementSibling.textContent;
                const data = locationData[locationId];
                selectedLocations.push(
                    `📍 ${locationName}\n` +
                    `   • Dirección: ${data.address}\n` +
                    `   • Monto autorizado: ${data.amount}\n`
                );
            }
        });

        if (selectedLocations.length === 0) {
            document.getElementById('warningModal').style.display = 'block';
            return;
        }

        const previewModal = document.getElementById('previewModal');
        const previewContent = document.getElementById('previewContent');
        previewContent.textContent = selectedLocations.join('\n');
        previewModal.style.display = 'block';

        // Modal button handlers
        document.getElementById('closePreview').onclick = () => {
            previewModal.style.display = 'none';
            document.getElementById('emailModal').style.display = 'block';
        };

        document.getElementById('confirmEmail').onclick = () => {
            const emailInput = document.getElementById('emailInput');
            const recipientEmail = emailInput.value.trim();
            
            if (!recipientEmail) {
                alert('Por favor ingrese un correo electrónico');
                return;
            }

            const mailtoLink = `mailto:${recipientEmail}?subject=Rutas Café La Cabaña - ${today}&body=` +
                encodeURIComponent(
                    `Buenos días,\n\n` +
                    `Por medio del presente se autoriza el gasto para las siguientes ubicaciones:\n\n` +
                    `${selectedLocations.join('\n')}\n\n` +
                    `Saludos cordiales.`
                );
            document.getElementById('emailModal').style.display = 'none';
            window.location.href = mailtoLink;
        };

        document.getElementById('cancelEmail').onclick = () => {
            document.getElementById('emailModal').style.display = 'none';
        };
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

    // Add unselect functionality
    unselectAllButton.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectAllCheckbox.checked = false;
        saveSelections();
    });
});