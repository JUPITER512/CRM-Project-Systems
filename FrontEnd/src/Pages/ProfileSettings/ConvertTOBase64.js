export function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        // fileReader.readAsDataURL(file): This line starts reading the file and converts it to a data URL (a Base64 string).

        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        // When the file is successfully read, fileReader.onload is triggered, and it calls resolve(fileReader.result). This means it sends the Base64 string back to wherever the function was called.
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}