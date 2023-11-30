import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const AddContest = () => {
    const today = new Date().toISOString().split('T')[0];

    const handleAddContest = event => {
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
        const contest = {
            name: name,
            image: image,
            tags: tag,
            description: description,
            participants: 0,
            status: 'Pending',
            price: price,
            prize: prize,
            deadline: deadline,
            instruction: instruction,
            creator: addedBy,


        }
        console.log(contest);


        fetch('https://contest-hub-server-nine.vercel.app/contests', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contest)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'New Contest Has Been Added',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset();
                }

            })
    }



    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/767/612/930/nature-landscape-trees-digital-art-wallpaper-preview.jpg)' }}>

                <div className="hero-overlay "></div>

                <div className="hero-content text-center text-neutral-content flex flex-col">
                    <h2 className="text-4xl text-[#C4FCF0] font-bold mt-6">Add Contest</h2>
                    <form onSubmit={handleAddContest} className="card-body">
                        <div className="grid grid-cols-2 gap-5">
                            {/* name */}
                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text text-[#C4FCF0] font-semibold">Contest Name</span>
                                </label>
                                <input type="text" placeholder="Contest Name" name="name" className="input input-bordered text-violet-950 " />
                            </div>
                            {/* Tags */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#C4FCF0] font-semibold">Contest Tag</span>
                                </label>
                                <select name="tag" className="select w-full max-w-xs text-violet-950">
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
                                <input type="number" min={0} placeholder="Contest Prize" name="prize" className="input input-bordered text-violet-950  " />
                            </div>
                            {/* price */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#C4FCF0] font-semibold">Contest Price</span>
                                </label>
                                <input type="number" min={0} placeholder="Contest Price" name="price" className="input input-bordered text-violet-950  " />
                            </div>
                            {/* Deadline */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#C4FCF0] font-semibold">Deadline</span>
                                </label>
                                <input min={today} type="date" placeholder="Deadline" name="deadline" className="input input-bordered text-violet-950  " />
                            </div>
                            {/* creator */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[#C4FCF0] font-semibold">Creator</span>
                                </label>
                                <input type="text" placeholder="Added By" name="addedBy" className="input input-bordered text-black font-bold" defaultValue={user?.email} disabled />
                            </div>
                            {/* Image */}
                            <div className="form-control col-span-2">
                                <label className="label">
                                    <span className="label-text font-semibold text-white">Contest Image URL</span>
                                </label>

                                <textarea name="image" className="textarea textarea-bordered text-violet-950" placeholder="Image URL"></textarea>
                            </div>
                            {/* description */}

                            <div className="form-control col-span-2">
                                <label className="label">
                                    <span className="label-text font-semibold text-white">Description</span>
                                </label>
                                <textarea name="description" className="textarea textarea-bordered text-violet-950" placeholder="Description"></textarea>
                            </div>
                            {/* instruction */}

                            <div className="form-control col-span-2">
                                <label className="label">
                                    <span className="label-text font-semibold text-white">Instruction</span>
                                </label>
                                <textarea name="instruction" className="textarea textarea-bordered text-violet-950" placeholder="Instruction"></textarea>
                            </div>


                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" className="btn bg-gradient-to-r from-[#bcd3db] to-[#3f4e5c]  hover:text-blue-300" value="Add Contest" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContest;