import axios from "axios";

export const axiosPublic = axios.create({
     baseURL: `https://contest-hub-server-nine.vercel.app`
}) 


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;