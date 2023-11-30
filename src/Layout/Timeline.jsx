import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timeline = () => {

    const axiosSecure = useAxiosSecure();
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    })
    console.log(contests);

    // State to store the countdown values
    const [countdowns, setCountdowns] = useState([]);

    // Calculate countdown for each contest
    useEffect(() => {
        const calculateCountdowns = () => {
            const now = new Date();

            const updatedCountdowns = contests.map((contest) => {
                const deadlineDate = new Date(contest.deadline);
                const timeDifference = deadlineDate - now;

                // Calculate days, hours, minutes, and seconds
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                return {
                    days,
                    hours,
                    minutes,
                    seconds,
                };
            });

            setCountdowns(updatedCountdowns);
        };

        const countdownInterval = setInterval(calculateCountdowns, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(countdownInterval);
    }, [contests]);


    return (
        <div>
            <div className="my-20">
                <h2 className="font-semibold text-3xl text-center mb-8 ">ContesHub Timeline Visualization</h2>
                <h2 className="text-center w-9/12 mx-auto">Welcome to our Contest Timeline Hub, where creativity meets chronology! Explore the fascinating journey of contests on our platform through an interactive timeline. From the inception of captivating ideas to the triumphant declaration of winners, witness every milestone that shapes the dynamic world of innovation. Dive into the timeline, filter by tags, and discover the rich history of contests that have sparked inspiration and talent across diverse domains</h2>


                <div className="overflow-x-auto mt-8">
                    <table className="table table-zebra w-full font-semibold text-xl">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-xl">
                                <th></th>
                                <th>Contest Name</th>
                                <th>Deadline</th>
                                <th>Prize Money</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>{contest?.name}</td>
                                    <td className="text-pink-600">
                                        {`${countdowns[index]?.days}d ${countdowns[index]?.hours}h ${countdowns[index]?.minutes}m ${countdowns[index]?.seconds}s`}
                                    </td>
                                    <td className="text-blue-500">${contest?.prize}</td>
                                    <td> <Link className="btn btn-md bg-sky-600 text-white hover:text-sky-600" to={`/contestdetails/${contest?._id}`}>
                                        Details
                                    </Link></td>


                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Timeline;