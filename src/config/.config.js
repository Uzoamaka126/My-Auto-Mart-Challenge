import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'uzoamakacloud',
    api_key: '265122322685213',
    api_secret: 'Ls_gbn040ZoHh--B_cdOCavj0No',
});
const fileUploads = file => new Promise((resolve) => {
    cloudinary.uploader.upload(
        file,
        (result) => {
            resolve({ url: result.url, id: result.public_id });
        },
        { resource_type: 'auto' },
    );
});

export default fileUploads;