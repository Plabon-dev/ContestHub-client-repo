import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaAward, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const ContestSubmitted = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contsets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;

        }
    })
    console.log(contests);
    const allAppliedContests = contests.filter(contest => contest?.status === 'Applied');
    const appliedContests = allAppliedContests.filter(contest => contest?.creator === user?.email);
    console.log(appliedContests);



    const handleWinner = contest => {
        axiosSecure.patch(`/payments/winner/${contest._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${contest?.name} is the WINNER`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className="my-16">
                <h3 className="text-3xl font-semibold text-center mb-16">Contest Submitted</h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Contest Name</th>
                                <th>Applicant Name</th>

                                <th>Applicant Email</th>
                                <th>Declare Winner</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                appliedContests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>{contest.ContestName}</td>
                                    <td>{contest?.name}</td>
                                    <td>{contest?.email}</td>
                                    <td>{contest.status === 'Winner' ? <div className="flex items-center"><FaAward className="text-orange-400 text-lg font-semibold"></FaAward><p className="font-bold text-orange-400 text-lg">Winner</p></div> : <button onClick={() => handleWinner(contest)}


                                        className="btn btn-sm bg-orange-500"><FaStar></FaStar>
                                    </button>}</td>




                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContestSubmitted;