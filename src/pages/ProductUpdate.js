import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;
let firstRender = true;

const ProductUpdate = () => {
    const { id } = useParams();
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [product, setProduct] = useState({
        title: "",
        quantity: 0,
        price: 0,
        thumbnail: null,
        images: [],
    })

    const getProduct = async (id) => {
        try {
            const res = await axios
                .get("http://localhost:3000/api/products/" + id, {
                    withCredentials: true,
                })
                .catch((err) => console.log(err));
            const data = await res.data;
            return setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (firstRender) {
            getProduct(id);
            firstRender = false;
        }
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        setProduct({ ...product, thumbnail: file });
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const selectedImagesArray = Array.from(files);

        const newSelectedImages = [...selectedImages, ...selectedImagesArray];
        setSelectedImages(newSelectedImages);

        const newPreviewImages = [...previewImages];
        selectedImagesArray.forEach((image) => {
            newPreviewImages.push(URL.createObjectURL(image));
        });
        setPreviewImages(newPreviewImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('quantity', product.quantity);
        formData.append('price', product.price);
        formData.append('thumbnail', product.thumbnail);

        const mergeImages = [...product.images, ...selectedImages];

        for (let i = 0; i < mergeImages.length; i++) {
            formData.append('images', mergeImages[i]);
        }

        try {
            const res = await axios.put('http://localhost:3000/api/products/' + id, formData).catch(err => console.log(err));
            const data = await res.data;
            if (res.status === 400 || res.status === 401) {
                return `${data.error}`;
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemovePreviewImage = (index) => {
        const updatedImages = [...previewImages];
        updatedImages.splice(index, 1);
        setPreviewImages(updatedImages);

        const updatedSelect = [...selectedImages];
        updatedSelect.splice(index, 1);
        setSelectedImages(updatedSelect);
    };

    const handleRemoveProductImage = (index) => {
        const updatedImages = [...product.images];
        updatedImages.splice(index, 1);
        setProduct({ ...product, images: updatedImages });
    };

    return (
        <div className='bg-white p-5 rounded-lg shadow-lg mb-5'>
            <div>
                <p className='text-lg font-semibold'>Product Form</p>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2.5'>
                        <input className='border' type="text" name="title" id="" value={product.title} onChange={handleChange} />
                        <input className='border' type="number" name="quantity" id="" required value={product.quantity} onChange={handleChange} />
                        <input className='border' type="number" name="price" id="" required value={product.price} onChange={handleChange} />
                        <input className='border' type="file" name="thumbnail" id="" onChange={handleThumbnailChange} />
                        <input className='border' type="file" multiple name="images" id="" onChange={handleImageChange} />
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Preview images</p>
                <div className='flex gap-2'>
                    {product.images.map((image, index) => (
                        <div key={index} className='relative w-fit border-2 border-red-600 rounded-lg p-1'>
                            <img src={`http://localhost:3000/uploads/${image}`} alt="" className='w-10 h-10' />
                            <button onClick={() => handleRemoveProductImage(index)} className='absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-red-600 text-white text-xs'>x</button>
                        </div>
                    ))}

                    {previewImages.map((previewImage, index) => (
                        <div key={index} className='relative w-fit border-2 border-red-600 rounded-lg p-1'>
                            <img src={previewImage} className='w-10 h-10 object-cover object-center' alt={`Preview ${index + 1}`} />
                            <button onClick={() => handleRemovePreviewImage(index)} className='absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-red-600 text-white text-xs'>x</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate