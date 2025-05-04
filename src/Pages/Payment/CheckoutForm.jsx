import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import usePackages from '../../Hooks/usePackages';
import useAuth from '../../Hooks/useAuth';
import useUserData from '../../Hooks/useUserData';
import Swal from 'sweetalert2';



const CheckoutForm = () => {

  const { userData, refetch } = useUserData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { coinPackages } = usePackages()
  const stripe = useStripe();
  const elements = useElements();
  const coinPackage = coinPackages?.find(coin => coin?._id === id)
  const navigate = useNavigate();




  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    const payAmount = { amount: (coinPackage?.dollars) * 100 };


    const client_secret = await axiosSecure.post('/secret', payAmount)
    // console.log(res)




    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);


      const payResult = await stripe.confirmCardPayment(client_secret?.data?.client_secret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user.displayName
          },
        },
      })


      if (payResult?.paymentIntent?.status === 'succeeded') {

        const updateCoins = { addCoins: coinPackage?.coins }

        const res = await axiosSecure.patch(`/update-coins?email=${user?.email}`, updateCoins)

        if (res.data.modifiedCount > 0) {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Payment Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/purchase-coin')
          refetch()
        }


      }



    }
  };

  return (
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;