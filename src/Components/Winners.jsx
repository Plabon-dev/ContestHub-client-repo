import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import WinnerCard from "./WinnerCard";

const Winners = () => {

    const axiosPublic = useAxiosPublic();


    const { data: all = [] } = useQuery({
        queryKey: ['all'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments`);
            return res.data;

        }
    })
    console.log(all);
    const winners = all.filter(winner => winner?.status == 'Winner');
    console.log(winners);


    return (
        <div className="bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/535/845/69/digital-art-artwork-fantasy-art-planet-sun-hd-wallpaper-thumb.jpg)' }}>
            <div className="py-20">
                <h2 className="text-3xl font-semibold text-center">
                    Triumphs Unveiled: Meet Our Contest Champions!
                </h2>
                <h2 className="w-9/12 mx-auto mt-8">Embark on a journey of excellence as we proudly present the exceptional winners of our latest contests. These brilliant minds have not only demonstrated exceptional skills but have also conquered challenges with unparalleled creativity. Join us in celebrating their achievements and get inspired to showcase your talent in our ongoing contests. Explore the innovation, witness the victories, and be part of the next wave of champions on ContestHub</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 place-content-center mt-12 gap-8 w-10/12 mx-auto">

                    {

                        winners.map(winner => <WinnerCard
                            key={winner._id}
                            winner={winner}
                        ></WinnerCard>)
                    }

                  


                </div>


            </div>

        </div>
    );
};

export default Winners;