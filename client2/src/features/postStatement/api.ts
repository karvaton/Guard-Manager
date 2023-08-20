const baseUrl = 'http://localhost:5000/';


export async function getData(date: string) {
    const response = await fetch(`${baseUrl}?date=${date.replaceAll('-', '')}`);
    const data: string[] = await response.json();
    return data;
}

export async function save(date: string, squad: string[]) {
    const result = await fetch(`${baseUrl}?date=${date.replaceAll('-', '')}`, {
        method: 'POST',
        body: JSON.stringify(squad),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    const blob = await result.blob();
    saveAS(blob);
}

function saveAS(data: Blob) {
    var csvURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'filename.docx');
    tempLink.click();
}