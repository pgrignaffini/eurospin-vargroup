//require('dotenv').config();
const key = process.env.NEXT_PUBLIC_PINATA_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET;
const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;

import axios from 'axios';
import FormData from 'form-data';

export const uploadJSONToIPFS = async (JSONBody: { name: string; description: string | undefined; image: string; }) => {

    const data = JSON.stringify({
        "pinataContent": {
            "name": JSONBody.name,
            "description": JSONBody.description,
            "image": JSONBody.image
        }
    })

    const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        data: data
    })

    return res
};

export const uploadFileToIPFS = async (file: any) => {
    //making axios POST request to Pinata ⬇️
    const data = new FormData();

    data.append('file', file);

    const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
        data: data
    });
    console.log(res.data);
    return res.data;
};