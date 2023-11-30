import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import { FaAtom, FaAward, FaBookOpen, FaBookmark, FaEdit, FaPlus, FaUser, FaUsers } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useCreator from "../../hooks/useCreator";


const DashBoard = () => {

    // todo
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();


    return (
        <div >
            <NavBar></NavBar>
            <div className="flex flex-col md:flex-row">
                {/* dashboard side bar */}
                <div className="w-full md:w-72 md:min-h-screen bg-gradient-to-r from-[#bcd3db] to-[#3f4e5c]">
                    <h2 className="text-2xl font-semibold text-center pt-4">Dashboard</h2>



                    <ul className="menu p-5">
                        {
                            isAdmin ? <>
                                    <div className="divider"></div>
                                <li><NavLink to='/dashboard/manageuser'><FaUsers></FaUsers>Manage Users</NavLink></li>
                                <li><NavLink to='/dashboard/managecontest'><FaEdit></FaEdit>
                                    Manage Contest</NavLink></li>

                            </>
                                :
                                <>

                                {
                                    isCreator ? <div>
                                         <div className="divider"></div>
                                    <li><NavLink to='/dashboard/addcontest'><FaPlus></FaPlus>Add Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/createdcontest'><FaAtom></FaAtom>My Created Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/contestsubmitted'><FaBookmark></FaBookmark> Contest Submitted</NavLink></li>

                                    </div> : <div>

                                    <div className="divider"></div>
                                    <li><NavLink to='/dashboard/myRegisteredContest'><FaBookOpen></FaBookOpen>My Registered Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/contestswinned'><FaAward></FaAward>My Winning Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/profile'><FaUser></FaUser>My Profile</NavLink></li>
                                    </div>
                                }


                                   


                                    

                                </>
                        }

                        {/*  */}


                    </ul>
                </div>

                {/* dashboard content */}
                <div className="flex-1 bg-no bg-repeat bg-cover bg-fixed" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2078271/pexels-photo-2078271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
                    <Outlet></Outlet>
                </div>



            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;