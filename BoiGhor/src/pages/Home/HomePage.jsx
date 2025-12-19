import React from "react";
import Banner from "../../components/Banner";
import LateBook from "../../components/LateBook";
import Coverage from "../../components/Coverage";
import News from "../../components/News";
import Newsletter from "../../components/NewsLetter";

const HomePage = () => {
    return (
        <div className="w-full min-h-screen bg-[#F6F9FA]">
            {/* Main container with consistent spacing */}
            <div className="flex flex-col gap-20 md:gap-28">

                {/* Banner Section */}
                <section className="w-full">
                    <Banner />
                </section>

                {/* Late Book Section */}
                <section className="w-full px-4 md:px-10">
                    <LateBook />
                </section>
                <section className="w-full px-4 md:px-10">
                    <News />
                </section>

                {/* Coverage Section */}
                <section className="w-full px-4 md:px-10 pb-12">
                    <Coverage />
                </section>
                <section className="w-full px-4 md:px-10 pb-12">
                    <Newsletter />
                </section>
            </div>
        </div>
    );
};

export default HomePage;
