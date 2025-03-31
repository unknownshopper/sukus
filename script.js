document.addEventListener('DOMContentLoaded', () => {
    // Remove the initial sorting code from outside and place it here
    const rutas = document.querySelectorAll('ul li');
    const rutasArray = Array.from(rutas);
    const rutasOrdenadas = rutasArray.sort((a, b) => {
        const nombreA = a.textContent.toLowerCase();
        const nombreB = b.textContent.toLowerCase();
        return nombreA < nombreB ? -1 : (nombreA > nombreB ? 1 : 0);
    });

    const ulOrdenado = document.createElement('ul');
    rutasOrdenadas.forEach(ruta => {
        ulOrdenado.appendChild(ruta);
    });
    document.querySelector('ul').replaceWith(ulOrdenado);

    // Now initialize the checkboxes and button
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('ul input[type="checkbox"]');

    // Handle "Select All" functionality
    selectAllCheckbox.addEventListener('change', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        saveSelections();
    });

    // Handle individual checkbox changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveSelections();
            updateSelectAllCheckbox();
        });
    });

    // Load saved selections
    loadSelections();

    // Add this after the existing event listeners
    const sendEmailButton = document.getElementById('sendEmail');
    // Add this after the existing event listeners
    const locationData = {
        'altabrisa': {
            address: 'Av. Bonanza #123, Col. Altabrisa, Villahermosa',
            amount: '$200'
        },
        'americas': {
            address: 'Av. Las Américas #456, Col. Las Américas, Villahermosa',
            amount: '$200'
        },
        'angeles': {
            address: 'Av. Los Ángeles #789, Col. Los Ángeles, Villahermosa',
            amount: '$200'
        },
        'centro': {
            address: 'Calle Madero #234, Col. Centro, Villahermosa',
            amount: '$200'
        },
        'cristal': {
            address: 'Av. Principal #567, Col. El Cristal, Villahermosa',
            amount: '$200'
        },
        'galerias': {
            address: 'Plaza Galerías #890, Col. Galerías, Villahermosa',
            amount: '$200'
        },
        'deportiva': {
            address: 'Av. Deportiva #345, Col. Deportiva, Villahermosa',
            amount: '$200'
        },
        'guayabal': {
            address: 'Calle Guayabal #678, Col. Guayabal, Villahermosa',
            amount: '$200'
        },
        'olmeca': {
            address: 'Av. Olmeca #901, Col. Olmeca, Villahermosa',
            amount: '$200'
        },
        'pista': {
            address: 'Av. Principal #432, Col. Pista de Hielo, Villahermosa',
            amount: '$200'
        },
        'usuma': {
            address: 'Calle Usumacinta #765, Col. Usuma, Villahermosa',
            amount: '$200'
        },
        'movil-deportiva': {
            address: 'Av. Deportiva #098, Col. Deportiva, Villahermosa',
            amount: '$200'
        },
        'movil-venta': {
            address: 'Carretera La Venta Km 2, La Venta',
            amount: '$200'
        },
        'walmart-carrizal': {
            address: 'Av. Carrizal #321, Col. Carrizal, Villahermosa',
            amount: '$200'
        },
        'walmart-deportiva': {
            address: 'Av. Deportiva #654, Col. Deportiva, Villahermosa',
            amount: '$200'
        },
        'walmart-universidad': {
            address: 'Av. Universidad #987, Col. Magisterial, Villahermosa',
            amount: '$200'
        }
    };

    // Replace the sendEmailButton click event with this:
    // Replace the alert in the sendEmailButton click handler
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
            const warningModal = document.getElementById('warningModal');
            const warningOk = document.getElementById('warningOk');
            
            warningModal.style.display = 'block';
            
            warningOk.onclick = () => {
                warningModal.style.display = 'none';
            };

            // Close warning modal when clicking outside
            window.onclick = (event) => {
                if (event.target === warningModal) {
                    warningModal.style.display = 'none';
                }
            };
            return;
        }

        // Show email modal
        const modal = document.getElementById('emailModal');
        const confirmBtn = document.getElementById('confirmEmail');
        const cancelBtn = document.getElementById('cancelEmail');
        const emailInput = document.getElementById('emailInput');
        
        modal.style.display = 'block';
        emailInput.value = '';

        confirmBtn.onclick = () => {
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
            modal.style.display = 'none';
            window.location.href = mailtoLink;
        };

        cancelBtn.onclick = () => {
            modal.style.display = 'none';
        };

        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    });

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
    // Add after the selectAll checkbox initialization
    const unselectAllButton = document.getElementById('unselectAll');

    // Add the unselect functionality
    unselectAllButton.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectAllCheckbox.checked = false;
        saveSelections();
    });
    // Add after your existing event listeners
    const previewButton = document.getElementById('previewSelection');
    
    previewButton.addEventListener('click', () => {
        const selectedLocations = [];
        
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
            const warningModal = document.getElementById('warningModal');
            warningModal.style.display = 'block';
            return;
        }

        const previewModal = document.getElementById('previewModal');
        const previewContent = document.getElementById('previewContent');
        const closePreview = document.getElementById('closePreview');

        previewContent.textContent = selectedLocations.join('\n');
        previewModal.style.display = 'block';

        closePreview.onclick = () => {
            previewModal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === previewModal) {
                previewModal.style.display = 'none';
            }
        };
    });
});