import { useState } from "react";
import useContest from "../hooks/useContest";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from "lottie-react";
import Cup from "../../public/Cup.json"



const Banner = () => {
    const [search, setSearch] = useState('');
    AOS.init();


    const contests = useContest(search);
    console.log(contests);


    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        console.log(searchText);
        setSearch(searchText);

    }

    return (
        <div>
            <div className="hero min-h-screen bg-no-repeat bg-co bg-center bg-fixed" style={{ backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/34/925/142/digital-digital-art-artwork-fantasy-art-landscape-hd-wallpaper-48d6bd086040bc18308ca16ef8b234ba.jpg)' }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div>

                    </div>
                    <div className="max-w-md">
                    <Lottie className="h-48" animationData={Cup} loop={true} />
                        <h1 className="mb-5 md:text-2xl text-lg font-semibold"><span className="text-[#c66e95] font-bold md:text-3xl text-xl">ContestHub</span> <br /> Igniting Ideas, Fostering Innovation, Celebrating Talent!</h1>
                        <div className="mb-3">
                            <div data-aos="zoom-in" className="">
                                <form onSubmit={handleSearch} className="relative mb-4 flex w-full flex-wrap items-stretch">

                                    <input name="search"
                                        type="search"
                                        className="relative text-white m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                        placeholder="Search Tags"
                                        aria-label="Search"
                                        aria-describedby="button-addon2" />


                                    <input type="submit" className="btn btn-ghost bg-violet-700 ml-1" value="Search" />

                                </form>
                                {search !== '' && (
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra w-full bg-gradient-to-r from-[#bcd3db] to-[#3f4e5c] text-black">

                                            <tbody>
                                                {contests.map((contest) => (
                                                    <tr key={contest?._id}>

                                                        <td>{contest.name}</td>
                                                        <td className="text-violet-950 font-semibold text-lg">{contest?.tags}</td>
                                                        <td>
                                                            <Link className="btn btn-xs bg-sky-600" to={`/contestdetails/${contest?._id}`}>
                                                                Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;