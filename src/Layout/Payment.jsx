import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "../Components/CheckOutForm";
import { useContext } from "react";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
import { AuthContext } from './../providers/AuthProvider';


const Payment = () => {

    const contest = useLoaderData();
    console.log(contest);
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className="py-14 min-h-screen">
                <h2 className="text-center text-xl md:text-3xl font-semibold">Secure Payments for ContestHub Excellence</h2>
                <h2 className="w-9/12 mx-auto my-5">Thank you for choosing ContestHub, where creativity meets competition! Your journey to hosting and participating in exciting contests is about to get even better. To ensure a seamless experience, we have crafted a secure and efficient payment process.</h2>

                <div className="w-11/12 md:w-7/12 mx-auto mt-12">
                    <h2 className="text-lg font-semibold text-center mb-2">Contest Name: {contest?.name}</h2>
                    <h2 className="text-lg font-semibold text-center mb-2">Registration Fee: ${contest?.price}</h2>
                    <h2 className="text-lg font-semibold text-center mb-16">Applicant Name: {user?.displayName}</h2>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm contest={contest}></CheckOutForm>
                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default Payment;