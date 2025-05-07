import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export const PdfMaintenances = (vehicle) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Establece el tamaño de la imagen en el PDF
    const imageWidth = 60; // ancho deseado en mm
    const imageHeight = 20; // alto deseado en mm

    // Calcula la posición centrada horizontalmente
    const centerX = (pageWidth - imageWidth) / 2;
    const yPosition = 20; // posición vertical donde se mostrará el logo

    // Añade la imagen PNG centrada
    doc.addImage(
        'data:image/png;base64,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',
        'PNG',
        centerX,
        yPosition,
        imageWidth,
        imageHeight
    );

    // Cabecera del vehículo
    doc.setFontSize(18)
    doc.setTextColor(0)
    doc.text(`Ficha del Vehículo`, 14, 55)

    doc.setFontSize(12)
    doc.text(`Marca: ${vehicle.marca}`, 14, 65)
    doc.text(`Modelo: ${vehicle.modelo}`, 14, 73)
    doc.text(`Matrícula: ${vehicle.matricula}`, 14, 81)

    // Mantenimientos
    const sortedManteinances = [...vehicle.manteinances].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    )

    // Crear la estructura de datos de la tabla
    const tableData = []

    sortedManteinances.forEach((m) => {
        const fecha = new Date(m.fecha).toLocaleDateString()
        const km = `${m.km || "-"} km`

        // Añadir los datos del mantenimiento
        tableData.push([
            {
                content: `${fecha}\n${km}`,
                styles: {
                    fontStyle: 'bold',
                    fillColor: [240, 240, 240],
                    textColor: 50,
                    halign: 'left'
                }
            },
            {
                content: `${m.descripcion || "-"}`,
                styles: {
                    fontStyle: 'bold',
                    fillColor: [240, 240, 240],
                    textColor: 50,
                    halign: 'left'
                }
            },
            {
                content: `${m.texto || "-"}`,
                styles: {
                    fontStyle: 'normal',
                    fillColor: [240, 240, 240],
                    textColor: 50,
                    halign: 'left'
                }
            },
        ])

        // Añadir una fila vacía para crear espacio entre mantenimientos
        tableData.push([
            { content: " ", styles: { fillColor: [255, 255, 255] } }, // Fila vacía para separación
            { content: " ", styles: { fillColor: [255, 255, 255] } },
            { content: " ", styles: { fillColor: [255, 255, 255] } }
        ])
    })

    // Insertar tabla de mantenimientos con espacio entre las filas
    autoTable(doc, {
        startY: 90, // Posición inicial
        head: [
            [{ content: "Fecha - KM" }, { content: "Servicio" }, { content: "Descripción" }]
        ],
        body: tableData,
        theme: 'plain',
        styles: {
            fontSize: 10,
            cellPadding: 3,
            lineWidth: 0,
            minCellHeight: 12 // Controlar altura mínima de las filas para agregar más espacio entre ellas
        },
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 80 },
            2: { cellWidth: 60 }
        },
        rowPageBreak: 'auto', // Permitir que la tabla se divida entre páginas
    })

    // Recopilar imágenes para agregar al final
    const imageData = sortedManteinances
        .filter((m) => m.image) // Filtramos los mantenimientos que tienen imagen
        .map((m) => m.image) // Creamos un array con las URLs de las imágenes

    if (imageData.length > 0) {
        // Saltamos a la siguiente página para las imágenes
        doc.addPage()

        doc.setFontSize(18)
        doc.setTextColor(0)
        doc.text(`Imágenes de los Mantenimientos`, 14, 20)

        let imageYPosition = 30
        const imageWidth = 180 // Tamaño de la imagen más grande
        const imageHeight = 150 // Tamaño de la imagen más grande

        // Añadir las imágenes al final
        imageData.forEach((image, index) => {
            try {
                if (index > 0) doc.addPage() // Agrega nueva página excepto para la primera
                doc.addImage(image, 'JPEG', 14, 30, imageWidth, imageHeight)
            } catch (err) {
                console.error(`No se pudo cargar la imagen del mantenimiento ${index}:`, err)
            }
        })

    }

    // Guardar el archivo PDF
    doc.save(`Mantenimientos_${vehicle.matricula}.pdf`)
}
