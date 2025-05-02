import axios from "axios";

export const imageUpload = async (image) => {

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`, { image }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data?.data?.display_url
}