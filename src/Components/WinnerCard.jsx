
const WinnerCard = ({ winner }) => {
    return (
        <div>
            <div className="group relative block overflow-hidden shadow-2xl">


                {winner && winner?.image ? <div className=""><img title="Profile" className="w-11/12 md:w-8/12 h-72  md:h-80 lg:h-[400px] mb-4 mx-auto rounded-full object-cover" src={winner?.image} alt="" /></div> :
                    <div>
                        {
                            <div><img title="Profile" className="w-8/12 mb-4 mx-auto rounded-full object-cover" src="https://images.pexels.com/photos/1480690/pexels-photo-1480690.jpeg" alt="" /></div>

                        }

                    </div>}

                <div className="relative border border-gray-100 bg-white p-6">
                    <span
                        className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"
                    >
                        Winner
                    </span>

                    <h3 className="mt-4 text-xl font-medium text-gray-900">{winner?.name}

                    </h3>
                    <h3 className=" text-lg font-medium text-gray-900">Contest: {winner?.ContestName}

                    </h3>

                    <p className="mt-1.5 text-base text-gray-700 font-bold"><b>Prize Money:</b> <span className="text-sky-600">${winner?.prize}</span></p>


                </div>
            </div>
        </div>
    );
};

export default WinnerCard;