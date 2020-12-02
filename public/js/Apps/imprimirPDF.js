export let imprimirPDF = () =>{
    const $elementoParaConvertir = document.getElementById('paginaPDF');
    html2pdf()
        .set({
            margin: 1,
            filename: 'EnvioYA',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: 'portrait'
            }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err));
    }