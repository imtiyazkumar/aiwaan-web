import React from "react";
import { Div, Flex } from "~/components/general/BaseComponents";
import GlassCard from "~/components/ui/GlassCard";

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [active, setActive] = React.useState(0);

    return (
        <GlassCard className="flex-1 p-4">
            <Div className="mb-4 h-50  md:h-100 lg:h-150 w-full overflow-hidden rounded-xl">
                <img
                    src={images[active]}
                    alt="Project view"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
            </Div>

            <Flex className="gap-3">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`overflow-hidden rounded-lg border transition-all ${active === index ? "border-primary-base scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
                    >
                        <img
                            src={img}
                            alt=""
                            className="h-15 w-20 object-cover"
                        />
                    </button>
                ))}
            </Flex>
        </GlassCard>
    );
};

export default ImageGallery;
