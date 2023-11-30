import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCreator = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: isCreator, isPending: isCreatorLoading } = useQuery({
        queryKey: [user?.email, 'isCreator'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is creator', user)
            const res = await axios.get(`http://localhost:5000/checkCreator/${user?.email}`);
            // console.log(res.data);
            return res.data?.creator;
        }
    })
    return [isCreator, isCreatorLoading]
};

export default useCreator;