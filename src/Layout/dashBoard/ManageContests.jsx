import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageContests = () => {

    const axiosSecure = useAxiosSecure();
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    })

    const handleDeleteContest = contest => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/contests/${contest._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Contest has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleApproved = contest =>{
        axiosSecure.patch(`/contests/approve/${contest._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${contest.name} has been Approved`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    console.log(contests);

    return (
        <div>
            <div className="py-16">
                <h2 className="text-3xl font-semibold text-center my-6">
                    Total Contests({contests.length})
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Prize Money</th>
                                <th>Tag</th>

                                <th>Action(Approve)</th>
                                <th>Action(Delete)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>{contest.name}</td>
                                    <td>${contest.prize}</td>
                                    <td>{contest.tags}</td>
                                    <td>
                                        {contest.status === 'Approved' ? 'Approved' : <button
                                         onClick={()=> handleApproved(contest)}
                                           
                                            className="btn btn-sm bg-orange-500">
                                            Pending
                                        </button>}
                                    </td>
                                    <td>
                                    <button
                                        onClick={() => handleDeleteContest(contest)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                    </td>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageContests;