const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async e=>{
    e.preventDefault();
    if(!fileInput.files[0]) return;

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    resultDiv.innerHTML = 'Uploading...';
    try{
        const res = await fetch('http://127.0.0.1:5000/upload',{
            method:'POST',
            body:formData
        });
        const data = await res.json();
        if(data.status === 'success'){
            resultDiv.innerHTML = `<p>${data.message}</p>
                                   <a href="${data.download_url}" target="_blank">Download Here</a>`;
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch(err){
        resultDiv.innerHTML = `<p>Error: ${err}</p>`;
    }
});
