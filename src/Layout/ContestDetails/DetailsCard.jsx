import { Link } from "react-router-dom";

const DetailsCard = ({ contest }) => {


    const date1 = new Date()
    const date2 = new Date(contest?.deadline)
    console.log(date2);
    console.log(date1);
    // const oneDay = 24 * 60 * 60 * 1000;
    const date1InMilliseconds = new Date(date1).getTime();
    const date2InMilliseconds = new Date(date2).getTime();
    // const differenceInDays = Math.round((date2InMilliseconds - date1InMilliseconds) / oneDay);

    const differenceInMilliseconds = date2InMilliseconds - date1InMilliseconds;
    const days = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((differenceInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((differenceInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

    console.log(`Difference: ${days} days, ${hours} hours, ${minutes} minutes`);



    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-2xl w-10/12 mx-auto p-0 md:p-10  flex">
                <figure className="flex-1 h-[420px]"><img className="h-96 md:h-full object-cover" src={contest?.image} alt="Album" /></figure>
                <div className="card-body flex-1">
                    <h2 className="text-center md:text-left  text-[#aa454a] font-semibold text-3xl md:text-2xl sm:text-lg">{contest?.name}</h2>
                    <div className="mt-4 md:text-left font-semibold text-sm md:text-base lg:text-lg">
                        <p>Participants: {contest?.participants}</p>
                        <p>Contest Type: {contest?.tags}</p>

                        <p>Registration Fee: ${contest?.price}</p>
                        <p>Deadline: {contest?.deadline} ({days} Days {hours} hour {minutes} minutes Left)</p>
                        <p>Description: <span className="font-normal text-sm">{contest?.description}</span></p>
                        <p>Instruction: <span className="font-normal">{contest?.instruction}</span></p>
                    </div>
                    <h2 className="text-center md:text-left text-[#aa454a] font-semibold text-2xl md:text-xl ">Prize Money: ${contest?.prize}</h2>
                    <div className="card-actions justify-center md:justify-end">
                        <Link to={`/payment/${contest?._id}`} className="btn btn-block hover:text-[#3c4251] text-[#cecdc9] bg-[#3c4251] mt-8">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;