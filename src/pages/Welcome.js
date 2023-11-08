import React from 'react'
import axios from "axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;

const Welcome = () => {
    const refreshToken = async () => {
        const res = await axios.post("http://localhost:3000/api/refresh-token", {
                withCredentials: true,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };
    useEffect(() => {
        return () => {
            refreshToken();
        }
    }, [])
    return (
        <div>Welcome</div>
    )
}

export default Welcome