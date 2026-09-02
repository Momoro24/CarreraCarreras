const urlFinal = `https://docs.google.com/spreadsheets/d/1Rw3_0rD4yxnBG-CRLSBBKEjkUK2f9-gJ4ZIqQNSGEfQ/export?format=csv`;

async function loadSheetData() {
    const statusBox = document.getElementById('status-box');
    const table = document.getElementById('data-table');

    try {
        const response = await fetch(urlFinal);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const csvText = await response.text();

        table.innerHTML = "";
        const rows = csvText.split(/\r?\n/).map(row => row.trim()).filter(row => row.length > 0);

        rows.forEach((rowText, index) => {
            const cells = rowText.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
            const rowElement = document.createElement('tr');

            cells.forEach(cellText => {
                const cellElement = document.createElement(index === 0 ? 'th' : 'td');
                cellElement.textContent = cellText;
                rowElement.appendChild(cellElement);
            });

            table.appendChild(rowElement);
        });

        statusBox.style.display = "none";
    } catch (error) {
        statusBox.className = "box error";
        statusBox.innerHTML = `Error interno del lector: <code>${error.message}</code>`;
        console.error("Detalle del error:", error);
    }
}

loadSheetData();