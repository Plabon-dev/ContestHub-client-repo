import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCreatedContest = () => {

    const { user } = useContext(AuthContext);

    const email = user?.email;
    const today = new Date().toISOString().split('T')[0];


    const axiosSecure = useAxiosSecure();
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['myContest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests`);
            return res.data;
        }
    })

    console.log(contests);

    const addedContests = contests.filter(contest => contest?.creator === user?.email);
    console.log(addedContests);


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


    const handleUpdateContest = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const tag = form.tag.value;
        const prize = form.prize.value;
        const price = form.price.value;
        const deadline = form.deadline.value;
        const addedBy = form.addedBy.value;
        const image = form.image.value;
        const description = form.description.value;
        const instruction = form.instruction.value;
        const _id = form._id.value;
        const contest = {
            name: name,
            image: image,
            tags: tag,
            description: description,
            price: price,
            prize: prize,
            deadline: deadline,
            instruction: instruction,
            creator: addedBy,


        }
        console.log(_id);
        console.log(contest);

         // send data to the server
         fetch(`http://localhost:5000/contests/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contest)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Contest Information has been updated',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })

                
            }
          

        })



    }



    return (
        <div>

            <div className="py-16">
                <h2 className="font-semibold text-center mb-10 text-3xl">
                    My Created Contest
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Status</th>

                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addedContests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>{contest?.name}</td>
                                    <td>{contest.status === 'Approved' ? <p className="text-sky-600 font-semibold text-lg">Approved</p> : <button
                                        className="btn btn-sm bg-orange-500">
                                        Pending
                                    </button>}</td>
                                    <td>
                                        <button onClick={() => document.getElementById('my_modal_5').showModal()} disabled={contest.status === 'Approved'}

                                            className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-red-600"></FaEdit>
                                        </button>
                                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">

                                                <div className="modal-action">
                                                    <div className="hero min-h-screen " style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/767/612/930/nature-landscape-trees-digital-art-wallpaper-preview.jpg)' }}>

                                                        <div className="hero-overlay "></div>

                                                        <div className="hero-content text-center text-neutral-content flex flex-col">
                                                            <h2 className="text-4xl text-[#C4FCF0] font-bold mt-6">Update Contest Info</h2>
                                                            <form onSubmit={handleUpdateContest} className="card-body">
                                                                <div className="grid grid-cols-2 gap-5">
                                                                    {/* name */}
                                                                    <div className="form-control">

                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">Contest Name</span>
                                                                        </label>
                                                                        <input defaultValue={contest.name} type="text" placeholder="Contest Name" name="name" className="input input-bordered text-violet-950 " />
                                                                    </div>
                                                                    {/* Tags */}
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">Contest Tag</span>
                                                                        </label>
                                                                        <select defaultValue={contest?.tags} name="tag" className="select w-full max-w-xs text-violet-950">
                                                                            <option disabled selected>Tags</option>
                                                                            <option>Business</option>
                                                                            <option>Medical</option>
                                                                            <option>Writing</option>
                                                                            <option>Gaming</option>
                                                                        </select>
                                                                    </div>

                                                                    {/* prize */}
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold"> Prize Money</span>
                                                                        </label>
                                                                        <input defaultValue={contest?.prize} type="number" min={0} placeholder="Contest Prize" name="prize" className="input input-bordered text-violet-950  " />
                                                                    </div>
                                                                    {/* price */}
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">Contest Price</span>
                                                                        </label>
                                                                        <input defaultValue={contest?.price} type="number" min={0} placeholder="Contest Price" name="price" className="input input-bordered text-violet-950  " />
                                                                    </div>
                                                                    {/* Deadline */}
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">Deadline</span>
                                                                        </label>
                                                                        <input defaultValue={contest?.deadline} min={today} type="date" placeholder="Deadline" name="deadline" className="input input-bordered text-violet-950  " />
                                                                    </div>
                                                                    {/* creator */}
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">Creator</span>
                                                                        </label>
                                                                        <input type="text" placeholder="Added By" name="addedBy" className="input input-bordered text-black font-bold" defaultValue={user?.email} disabled />
                                                                    </div>
                                                            
                                                                    {/* _id */}
                                                                    <div className="form-control hidden">
                                                                        <label className="label">
                                                                            <span className="label-text text-[#C4FCF0] font-semibold">_id</span>
                                                                        </label>
                                                                        {/* Set the defaultValue to contest._id */}
                                                                        <input type="text" placeholder="Added By" name="_id" className="input input-bordered text-black font-bold" defaultValue={contest._id} />
                                                                    </div>
                                                                    {/* Image */}
                                                                    <div className="form-control col-span-2">
                                                                        <label className="label">
                                                                            <span className="label-text font-semibold text-white">Contest Image URL</span>
                                                                        </label>

                                                                        <textarea defaultValue={contest?.image} name="image" className="textarea textarea-bordered text-violet-950" placeholder="Image URL"></textarea>
                                                                    </div>
                                                                    {/* description */}

                                                                    <div className="form-control col-span-2">
                                                                        <label className="label">
                                                                            <span className="label-text font-semibold text-white">Description</span>
                                                                        </label>
                                                                        <textarea defaultValue={contest?.description} name="description" className="textarea textarea-bordered text-violet-950" placeholder="Description"></textarea>
                                                                    </div>
                                                                    {/* instruction */}

                                                                    <div className="form-control col-span-2">
                                                                        <label className="label">
                                                                            <span className="label-text font-semibold text-white">Instruction</span>
                                                                        </label>
                                                                        <textarea defaultValue={contest?.instruction} name="instruction" className="textarea textarea-bordered text-violet-950" placeholder="Instruction"></textarea>
                                                                    </div>


                                                                </div>
                                                                <div className="form-control mt-6">

                                                                    <input type="submit" className="btn bg-gradient-to-r from-[#bcd3db] to-[#3f4e5c]  hover:text-blue-300" value="Update Contest" />
                                                                </div>
                                                            </form>
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </dialog>

                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteContest(contest)}
                                            className="btn btn-ghost btn-lg" disabled={contest.status === 'Approved'}>
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>

                                </tr>)
                            }

                        </tbody>
                    </table>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}



                </div>
            </div>

        </div>
    );
};

export default MyCreatedContest;