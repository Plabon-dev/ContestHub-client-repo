import { Link } from "react-router-dom";

const PopularCard = ({ contest }) => {
    return (
        <div>
            <div className="group relative block h-64 sm:h-80 lg:h-96">
                <span className="absolute inset-0 border-2 border-dashed border-black"></span>
            

                <div
                    className="relative bg-no-repeat bg-cover flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
                >
                        <img
                    alt="Developer"
                    src={contest?.image}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-70"
                />
                    <div
                        className="p-4 !pt-0 absolute transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
                    >


                        <h2 className="mt-4 text-xl text-[#cecdc9] font-semibold sm:text-2xl">{contest.name}</h2>
                        <h3 className="mt-2 text-lg text-[#5b82a1] font-semibold">Participants: {contest.participants}</h3>

                    </div>

                    <div
                        className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
                    >
                        <h3 className="mt-4 text-xl  font-semibold sm:text-2xl">{contest.name}</h3>
                        <h3 className="mt-2 text-xl font-medium">Participants: {contest.participants}</h3>

                        <p className="mt-4 text-sm sm:text-base">
                            <span className="font-medium">Description:</span> {contest.description}
                        </p>
                        <div className="flex justify-end">
                            <Link to={`/contestdetails/${contest?._id}`} className="btn mt-4 bg-[#2596BE]">Details</Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCard;