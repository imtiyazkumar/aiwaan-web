import React from "react";
import { Div, Flex } from "../components/general/BaseComponents";
import { FaUsers, FaMapMarkerAlt, FaLightbulb } from "react-icons/fa";

const About: React.FC = () => {
    return (
        <Div className="max-w-[1200px] mx-auto py-12">
            <h1 className="text-32 font-bold text-secondary-500 mb-8">About Us</h1>
            <Flex className="flex-col md:flex-row items-center gap-8">
                <Div className="flex-1">
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="About Aiwaan"
                        className="rounded-lg shadow-md"
                    />
                </Div>
                <Div className="flex-1">
                    <Flex className="items-center mb-4">
                        <FaUsers className="text-24 text-secondary-500 mr-2" />
                        <h2 className="text-20 font-bold text-secondary-500">Who We Are</h2>
                    </Flex>
                    <p className="text-16 text-neutral-600 leading-relaxed">
                        At Aiwaan, we specialize in architectural visualization services that bring your ideas to life. Based in Sopore, Jammu and Kashmir, our team combines local expertise with cutting-edge technology to deliver exceptional designs tailored to your needs.
                    </p>
                    <Flex className="items-center mt-6 mb-4">
                        <FaMapMarkerAlt className="text-24 text-secondary-500 mr-2" />
                        <h2 className="text-20 font-bold text-secondary-500">Our Location</h2>
                    </Flex>
                    <p className="text-16 text-neutral-600 leading-relaxed">
                        We are proud to be based in the heart of Sopore, a region rich in culture and heritage. Our designs reflect the beauty and uniqueness of our surroundings.
                    </p>
                    <Flex className="items-center mt-6 mb-4">
                        <FaLightbulb className="text-24 text-secondary-500 mr-2" />
                        <h2 className="text-20 font-bold text-secondary-500">Our Vision</h2>
                    </Flex>
                    <p className="text-16 text-neutral-600 leading-relaxed">
                        Our mission is to create designs that not only meet but exceed client expectations, blending functionality with aesthetics. We aim to transform your vision into reality.
                    </p>
                </Div>
            </Flex>
        </Div>
    );
};

export default About;
