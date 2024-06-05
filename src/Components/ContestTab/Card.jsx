import { Link } from "react-router-dom";

const Card = ({ item }) => {
    return (
        <div>
            <div className="group relative block bg-black ">
                <img
                    alt="Contest"
                    src={item?.image}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {item?.tags}
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">{item?.name}</p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div
                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 "
                        >
                            <p className=" text-green-300 text-2xl">
                                Participants: {item?.participants}
                            </p>
                            <p className=" text-sky-400 text-xl">
                                Registration Fee: ${item?.price}
                            </p>
                            <p className="text-xs text-white mt-2">
                                {item?.description && item?.description.length > 100
                                    ? `${item.description.substring(0, 100)}...`
                                    : item.description}
                            </p>
                            <div className="flex justify-end mt-4">
                                <Link to={`/contestdetails/${item?._id}`} className="btn btn-ghost border-red-500 text-red-500">Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;