import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const Payment = () => {
    const axiosSecure = useAxiosSecure();



    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

    return (

       <div className='py-72 max-w-4xl mx-auto'>
         <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
       </div>

    );
};

export default Payment;