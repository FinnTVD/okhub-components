"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
    { src: "https://picsum.photos/id/1015/1920/1080", alt: "Slide 1" },
    { src: "https://picsum.photos/id/1016/1920/1080", alt: "Slide 2" },
    { src: "https://picsum.photos/id/1018/1920/1080", alt: "Slide 3" },
];

export default function SwiperParallax() {
    return (
        <div className="w-full h-full overflow-hidden">
            <Swiper
                slidesPerView={1}
                modules={[Parallax, Autoplay, Pagination]}
                speed={1500}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                parallax={true}
                grabCursor={true}
                className="w-full h-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-full relative overflow-hidden"
                    >
                        <div
                            className="size-full overflow-hidden absolute top-0 left-0 will-change-transform"
                            data-swiper-parallax="50%"
                        >
                            <Image
                                width={1920}
                                height={1080}
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover will-change-transform"
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination" />
            </Swiper>
        </div>
    );
}

export const SwiperParallaxCode = `
"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
    { src: "https://picsum.photos/id/1015/1920/1080", alt: "Slide 1" },
    { src: "https://picsum.photos/id/1016/1920/1080", alt: "Slide 2" },
    { src: "https://picsum.photos/id/1018/1920/1080", alt: "Slide 3" },
];

export default function SwiperParallax() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <Swiper
                slidesPerView={1}
                modules={[Parallax, Autoplay, Pagination]}
                speed={1500}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                parallax={true}
                className="w-full h-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="relative overflow-hidden"
                    >
                        <div
                            className="size-full overflow-hidden absolute top-0 left-0 will-change-transform"
                            data-swiper-parallax="70%"
                        >
                            <Image
                                width={1920}
                                height={1080}
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover will-change-transform"
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination" />
            </Swiper>
        </div>
    );
}
`;
