import React from "react";
import axios from "axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;

const Welcome = () => {
    const image = 'https://img.freepik.com/premium-photo/young-beautiful-woman-sits-green-grass-park-looks-out-into-setting-sun_163305-180600.jpg';
    
    const refreshToken = async () => {
        const res = await axios
            .post("http://localhost:3000/api/refresh-token", {
                withCredentials: true,
            })
            .catch((err) => console.log(err.message));

        const data = await res.data;
        return console.log(data);
    };

    useEffect(() => {
        return () => {
            refreshToken();
        };
    }, []);
    return (
        <>
            <div
                className="w-full relative h-[280px] overflow-hidden block z-10 before:content-['']
                before:absolute before:inset-0 before:block before:bg-gradient-to-t from-black before:opacity-100 before:z-[-5] bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${image})`}}
            >
                <div className="flex absolute top-[240px] items-center justify-between w-full h-[24px] px-2.5">
                    <h1 className="text-[20px] font-bold text-white">Jame Kalambo</h1>
                    <div className="flex gap-3">Facebook</div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
