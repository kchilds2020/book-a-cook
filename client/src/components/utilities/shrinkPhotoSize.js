const shrinkPhotoSize = (file) => {
    var blob = file.slice(0, file.size, 'image/jpeg'); 
    let newFile = new File([blob], `${file.name}`, {type: 'image/jpeg'});
    
    return ;
}

export default shrinkPhotoSize
