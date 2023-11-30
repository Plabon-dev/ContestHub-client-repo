import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyWinCards from "../../Components/MyWinCards";

const MyWinnedContest = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: allContests = [] } = useQuery({
        queryKey: ['contsets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;

        }
    })
    console.log(allContests);
    const contests = allContests.filter(contest => contest?.email == email);
    console.log(contests);
    const myWin = contests.filter(contest => contest?.status == 'Winner');
    console.log(myWin);



    return (
        <div >
            <div className="py-16 mx-auto bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: 'url()' }}>
                <h2 className="text-3xl font-semibold text-center mb-8">Triumphs Unveiled: My Winning Journey</h2>
                <h2 className="w-9/12 mx-auto mb-8">
                    Welcome to your personal hall of victories! Here, we celebrate your achievements and showcase the glorious moments when your skills and determination conquered challenges. Each win represents not just success, but a testament to your dedication and prowess.
                </h2>

                <section>
                    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                        <header className="text-center">
                            <h2 className="text-xl font-semibold text-violet-500 sm:text-3xl">
                                A Gallery of Triumphs
                            </h2>


                        </header>

                        <ul className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-2 place-content-center">

                            {

                                myWin.map(winner => <MyWinCards
                                    key={winner._id}
                                    winner={winner}
                                ></MyWinCards>)
                            }


                           
                        </ul>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default MyWinnedContest;