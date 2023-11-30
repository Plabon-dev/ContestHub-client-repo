import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure, { axiosSecure } from './../hooks/useAxiosSecure';
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment/moment";

const CheckOutForm = ({contest}) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const price = parseFloat(contest?.price);
  const participants = parseFloat(contest?.participants) + 1;
  console.log(participants);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: price })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
  }, [axiosSecure, price])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        }
      }
    })

    if (confirmError) {
      console.log("confirm error")
    }
    else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log("transactionId", paymentIntent.id);
        setTransactionId(paymentIntent.id)

        // save to database
        const payment = {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
          transactionId: paymentIntent.id,
          prize: contest?.prize,
          ContestName: contest?.name,
          deadline: contest?.deadline,
          participants: participants,
          contestId: contest?._id,  
          creator: contest?.creator,
          status: 'Registered',
          date: new Date(),   
        }
        console.log(payment);
        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved' , res);


        let timerInterval;
        Swal.fire({
          title: "Payment Successful",
          html: `$${contest?.price} successfully Deducted`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
        
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });


      }
    }

    const count = {participants : participants}

    fetch(`http://localhost:5000/contests/count/${contest?._id}`, {
      method: 'PUT',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(count)
  })
  .then(res => res.json())
  .then(data =>{
      console.log(data);
      if(data.modifiedCount > 0){
          console.log("Updated");

          
      }
    

  })
    

  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-error btn-sm mt-6" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red mt-4">{error}</p>
        {transactionId && <p className="text-green-600 mt-4"> Your transaction id: {transactionId} </p>}
      </form>
    </div>
  );
};

export default CheckOutForm;