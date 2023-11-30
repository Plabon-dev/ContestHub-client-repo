import Banner from "../../Components/Banner";
import ContestCreator from "../../Components/ContestCreator";
import Popular from "../../Components/Popular";
import Winners from "../../Components/Winners";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Popular></Popular>
            <Winners></Winners>
            <ContestCreator></ContestCreator>
        </div>
    );
};

export default Home;