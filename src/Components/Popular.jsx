import { useEffect, useState } from "react";
import PopularCard from "./PopularCard";

const Popular = () => {
    const [contest, setContest] = useState([]);
    useEffect(()=>{
        fetch('https://contest-hub-server-nine.vercel.app/contests')
        .then(res => res.json())
        .then(data => {
            const approved = data.filter(item => item.status === "Approved");
            console.log(approved);
            setContest(approved)
        
        })
    }, [])

    const popularContests = contest.sort((a, b) => parseFloat(b.participants) - parseFloat(a.participants)).slice(0, 6);

    return (
        <div className="py-14 bg-no-repeat bg-fixed bg-cover"  style={{backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/339/179/774/digital-art-low-poly-artwork-minimalism-wallpaper-7836ad3840b03c28007c615ef852941a.jpg)'}}>
            <div className="">
            <h2 className="text-3xl font-semibold text-center">
            Join the Craze: Trending Contests You Can't Miss!
            </h2>
            <p className="mt-8 w-9/12 mx-auto">Dive into the world of creativity and innovation with our handpicked selection of popular contests that are making waves! Whether you're a design virtuoso, coding maestro, or a wordsmith extraordinaire, there's a contest for everyone. Engage with a vibrant community, showcase your talent, and seize the opportunity to be recognized as a top contender. Check out these trending contests below and embark on a journey of inspiration, skill, and excitement!</p>
            </div>

            <div className="grid grid-cols-1 place-content-center md:grid-cols-2 w-10/12 mx-auto gap-10 my-16">
           {
                popularContests?.map(contest =><PopularCard 
                    key={contest._id} 
                    contest={contest} 
               ></PopularCard>)
            }
           </div>


        </div>
    );
};

export default Popular;