
import Banner from '../../components/Banner';
import AvailableTask from './AvailableTask';
import BestWorkers from './BestWorkers';
import Testimonials from './Testimonials';
import Faq from './Faq';
import Statistics from './Statistics';
import ReactHelmet from '../../components/ReactHelmet';




const Home = () => {
    return (
        <div>
            <ReactHelmet helmetText={'Home'}/>
            <Banner />
            <BestWorkers />
            <AvailableTask />
            <Faq />
            <Statistics />
            <Testimonials />
        </div>
    );
};

export default Home;