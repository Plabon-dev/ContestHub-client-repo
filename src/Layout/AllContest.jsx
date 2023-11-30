import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ContestTab from "../Components/ContestTab/ContestTab";

const AllContest = () => {

    const [tabIndex, setTabIndex] = useState(0);



    const [contest, setContest] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/contests')
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === "Approved");
                console.log(approved);
                setContest(approved)

            })
    }, [])

    const writing = contest.filter(item=> item.tags === "Writing");
    const gaming = contest.filter(item=> item.tags === "Gaming");
    const business = contest.filter(item=> item.tags === "Business");
    const medical = contest.filter(item=> item.tags === "Medical");
  
    
    

    return (
        <div className="bg-fixed bg-no-repeat bg-cover"  style={{backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/535/845/69/digital-art-artwork-fantasy-art-planet-sun-hd-wallpaper-preview.jpg)'}}>
            <div className="py-20">
                <h2 className="font-semibold text-3xl text-center">
                    Discover a World of Creativity: All Contests Await!
                </h2>
                <h2 className="w-9/12 mx-auto mt-4">Dive into a spectrum of innovation and talent by exploring our All Contests page. Here, a diverse range of challenges beckon, from design marvels and coding conquests to eloquent wordsmithing and thrilling gaming showdowns. Engage with the myriad of contests created by our vibrant community. Whether you're seeking to participate or simply revel in the extraordinary, this is your gateway to a universe of limitless creativity. Explore, choose, and embark on your next exciting venture with ContestHub!</h2>
                <div className="mt-6">
                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <div className='flex justify-center items-center mt-10'>
                        <TabList>
                            <Tab>All</Tab>                          
                            <Tab>Writing</Tab>
                            <Tab>Gaming</Tab>
                            <Tab>Business</Tab>
                            <Tab>Medical</Tab>
                           
                        </TabList>
                        </div>
                        <TabPanel>
                            <ContestTab items={contest}></ContestTab>
                        </TabPanel>
                       
                        
                        <TabPanel>
                            <ContestTab items={writing}></ContestTab>
                        </TabPanel>
                        <TabPanel>
                            <ContestTab items={gaming}></ContestTab>
                        </TabPanel>
                        <TabPanel>
                            <ContestTab items={business}></ContestTab>
                        </TabPanel>
                        <TabPanel>
                            <ContestTab items={medical}></ContestTab>
                        </TabPanel>
                        
                     
                    </Tabs>
                </div>

            </div>
        </div>
    );
};

export default AllContest;