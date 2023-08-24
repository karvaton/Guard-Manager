export function saveAS(data: Blob) {
    var csvURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'filename.docx');
    tempLink.click();
}
