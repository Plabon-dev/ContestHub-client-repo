import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaCheckDouble } from "react-icons/fa";

const MyRegisteredContest = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: allContests = [], refetch } = useQuery({
        queryKey: ['contsets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${email}`);
            return res.data;

        }
    })
    console.log(allContests);
    const contests = allContests.filter(contest => contest?.email == email);


    const handleApply = contest =>{
        axiosSecure.patch(`/payments/${contest._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Applied to ${contest.ContestName}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    console.log(contests);


    const contestsSortedByDeadline = contests.slice().sort((a, b) => {
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
        return deadlineA - deadlineB;
      });

    return (
        <div>
            <h2 className="text-3xl font-semibold my-16 text-center">My Registered Contests</h2>
            <div className="flex justify-evenly my-4">
               
                <h2 className="text-3xl">Total contests: {contests.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Name</th>
                            <th>Deadline</th>
                            <th>Click to Apply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contestsSortedByDeadline.map((contest, index) => <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest?.ContestName}</td>
                                <td>{contest?.deadline}</td>
                                <td>
                                { contest.status === 'Registered' ? <button
                                        onClick={() => handleApply(contest)}
                                        className="btn btn-sm bg-orange-500">
                                        Registered
                                    </button> : 
                                    <div className="flex items-center"><FaCheckDouble className="text-purple-500 font-semibold"></FaCheckDouble><p className="text-purple-500 font-semibold text-lg"> Applied</p></div> 
                                    }
                                </td>
                              
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRegisteredContest;