
const MyWinCards = ({winner}) => {
    return (
        <div>
            <li>
                <div className="block overflow-hidden group shadow-2xl rounded-xl">
                    
                {winner && winner?.image ? <div><img title="Profile" className="w-8/12 my-4 mx-auto rounded-full object-cover" src={winner?.image} alt="" /></div> :
                    <div>
                        {
                            <div><img title="Profile" className="w-8/12 my-4 mx-auto rounded-full object-cover" src="https://images.pexels.com/photos/1480690/pexels-photo-1480690.jpeg" alt="" /></div>

                        }

                    </div>}

                    <div className="relative pt-3 bg-gradient-to-r from-[#bcd3db] to-[#3f4e5c]">
                        <h3
                            className="text-xl text-center font-semibold text-violet-950 group-hover:underline group-hover:underline-offset-4"
                        >
                           {winner?.ContestName}
                        </h3>

                        <p className="pb-4 text-center">
                            

                            <span className="tracking-wider text-sky-800 hover:text-orange-400 font-semibold text-lg">Winning Reward: ${winner?.prize} </span>
                        </p>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default MyWinCards;