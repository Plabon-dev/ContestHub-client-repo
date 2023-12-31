import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axios.get(`https://contest-hub-server-nine.vercel.app/checkAdmin/${user?.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;