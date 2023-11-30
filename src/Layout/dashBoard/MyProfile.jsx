import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {

    const { user, updateUserProfile } = useContext(AuthContext);

    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    const { data: contests = [],  } = useQuery({
        queryKey: ['contsets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;

        }
    })
    console.log(contests);
    const MyContests = contests.filter(contest => contest?.email === email);
    const appliedContests = MyContests.filter(contest => contest?.status == 'Applied');
    console.log(appliedContests);






    const handleChangeName = (e) => {

        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        console.log(name, user?.photoURL);
        updateUserProfile(name, user?.photoURL);
        window.location.reload();

    }
    const handleChangeImage = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const photo = form.get('photo');
        console.log(photo, user?.displayName);
        updateUserProfile(user?.displayName, photo)
        window.location.reload();


    }

    return (
        <div>

            <div className="my-16">
                <h2 className="text-3xl text-center font-semibold my-6">My Profile</h2>
            </div>
            <div className="w-11/12 md:w-5/12 mx-auto my-10">

                <div className="group relative block overflow-hidden shadow-xl">

                    {user && user?.photoURL ? <div className="flex flex-col items-center">
                        <img title="Profile" className=" rounded-full border-[#8ABB6A] border-2 w-44 mx-auto object-cover" src={user && user.photoURL} alt="" />
                        <FaEdit className="text-xl my-2" onClick={() => document.getElementById('my_modal_6').showModal()}></FaEdit>
                    </div>

                        :
                        <div className="flex flex-col items-center">
                            {
                                <img title="Profile" className="w-44 object-cover mx-auto rounded-full  border-[#8ABB6A] border-2" src='https://web.programming-hero.com/static/media/profileImage.934e5b10.png' alt="" />

                            }
                            <FaEdit className="text-xl my-2" onClick={() => document.getElementById('my_modal_6').showModal()}></FaEdit>

                        </div>}

                    <div className="relative border border-gray-100 bg-white p-6 flex flex-col justify-center">

                        <div className="bg-yellow-400 flex items-center px-2">
                            <span
                                className="whitespace-nowrap flex justify-start  px-3 py-1.5 text-xs md:text-lg font-medium"
                            >
                                {user?.displayName}

                            </span>
                            <FaEdit className="text-xs md:text-lg" onClick={() => document.getElementById('my_modal_5').showModal()}></FaEdit>

                            {/* name */}
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg mb-4">Change Profile Name</h3>
                                    <form onSubmit={handleChangeName}>
                                        <input defaultValue={user?.displayName} name="name" type="text" placeholder="Type here" className="input input-bordered w-10/12 max-w-xs" />
                                        <input className="btn mt-2 md:mt-0 md:ml-2" type="submit" value='Change'></input>
                                    </form>
                                    <div className="modal-action mt-16">
                                        <form method="dialog">

                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            {/* picture */}
                            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg mb-4">Change Profile Picture</h3>
                                    <form onSubmit={handleChangeImage}>
                                        <input defaultValue={user?.photoURL} name="photo" type="text" placeholder="Type here" className="input input-bordered w-10/12 max-w-xs" />
                                        <input className="btn ml-2 mt-2 md:mt-0" type="submit" value='Change'></input>
                                    </form>
                                    <div className="modal-action mt-16">
                                        <form method="dialog">

                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>




                        <h3 className="mt-4 text-xs md:text-base text-gray-900">Email: {user?.email}</h3>
                        




                    </div>
                </div>

            </div>
            <div className="my-20">
                        <h2 className="text-2xl font-semibold text-center mb-10">
                            Win Percentage
                        </h2>
                        <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Contest Name</th>
                                <th>Prize Money</th>
                            
                                <th>Winning Percentage</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appliedContests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>{contest.ContestName}</td>
                                    <td className="text-sky-600 font-semibold">${contest?.prize}</td>
                                    <td>{
                                        

                                        contest?.participants ? (
                                          ( 1/ parseFloat(contest?.participants) * 100).toFixed(2) + '%'
                                        ) : (
                                            'N/A'
                                        )

                                        }
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

export default MyProfile;