import { useLoaderData } from "react-router-dom";
import DetailsCard from "./DetailsCard";

const ContestDetails = () => {

    const contest = useLoaderData();
    console.log(contest);

    return (
        <div className="bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg)'}}>
            
            <div className="py-20">

            <h2 className="text-3xl text-white mb-4 font-semibold w-9/12 mx-auto text-center">
                {contest?.name} Details
            </h2>
            <DetailsCard contest={contest}></DetailsCard>
            </div>


        </div>
    );
};

export default ContestDetails;