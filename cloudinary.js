import cloudinary from 'cloudinary';

//Include your cloudinary credentials
cloudinary.config({
    cloud_name: "dgzpid1og",
    api_key: "427678654859459",
    api_secret: "Ju5NP-Vi9iSEc4Fu-U74H5F6Fdo"
});

const uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
}
export default uploads;