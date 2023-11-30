import axios from "axios";

export const axiosSecure = axios.create({
     baseURL: `https://contest-hub-server-nine.vercel.app`
}) 

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;