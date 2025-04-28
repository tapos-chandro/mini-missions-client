import SectionTitle from '../../components/SectionTitle';
import faq from '../../assets/images/FAQ.png'



const Faq = () => {

    const faqs = [
        {
            id: 1,
            question: "How do I start earning on the platform?",
            answer: "Simply sign up as a worker, complete available tasks, and start collecting coins that can be redeemed for cash or rewards.",
        },
        {
            id: 2,
            question: "How can I post a task?",
            answer: "Register as a buyer, navigate to the task creation dashboard, fill out the required details, and submit your task for review.",
        },
        {
            id: 3,
            question: "When do I get paid?",
            answer: "Payments are processed once you reach the minimum payout threshold, and payouts are done weekly to your selected payment method.",
        },
        {
            id: 4,
            question: "Is there any fee to use the platform?",
            answer: "Joining as a worker is completely free. Buyers may pay a small fee per task to support platform maintenance and security.",
        },
    ];

    return (
        <div>
            <SectionTitle title="FAQ" />
            <div className='grid lg:grid-cols-2 grid-cols-1 items-center'>
                <div>
                    <img src={faq} alt="FAQ" className='w-full' />
                </div>
                <div >
                    {
                        faqs.map(faq =>
                            <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-8">
                                <input type="radio" name="my-accordion-2" defaultChecked />
                                <div className="collapse-title font-semibold text-secondary-color text-xl">{faq?.question}</div>
                                <div className="collapse-content text-secondary-text text-lg">{faq?.answer}</div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Faq;