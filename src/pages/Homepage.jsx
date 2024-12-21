import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import TopFoodsSection from "../components/TopFoodsSection";
import WhyChooseUs from "../components/WhyChooseUs";


const Homepage = () => {
    return (
        <div >
            <div className="min-h-screen">
            <Banner></Banner>
            </div>

            <div>
                <TopFoodsSection></TopFoodsSection>
            </div>

            <div>
                <WhyChooseUs></WhyChooseUs>
            </div>

            <div>
                <Testimonials></Testimonials>
            </div>


        </div>

       
    );
};

export default Homepage;