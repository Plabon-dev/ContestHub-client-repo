import { useEffect, useState } from "react";
import { axiosSecure } from "./useAxiosSecure";

const useContest = (search) => {

    const [contests, setContests] = useState([]);
    useEffect(()=>{
        axiosSecure(`/contests/let?search=${search}`)
        .then(res => setContests(res.data))
    }, [search])



    return contests;
};

export default useContest;