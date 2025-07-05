"use client";

import { useSwiperBanner } from "@/app/(main)/slider/_components/useSwiperBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";

interface ImageData {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes?: {
        thumbnail: string;
        "thumbnail-width": number;
        "thumbnail-height": number;
        medium: string;
        "medium-width": number;
        "medium-height": number;
        medium_large: string;
        "medium_large-width": number;
        "medium_large-height": number;
        large: string;
        "large-width": number;
        "large-height": number;
        "1536x1536": string;
        "1536x1536-width": number;
        "1536x1536-height": number;
        "2048x2048": string;
        "2048x2048-width": number;
        "2048x2048-height": number;
    };
}

interface BannerItem {
    select: "upload" | "video" | "img";
    img_pc?: ImageData | false;
    img_mb?: ImageData | false;
    link_video_youtube?: string;
    upload_video?: ImageData;
}

const mockData: BannerItem[] = [
    {
        select: "video",
        img_pc: false,
        img_mb: false,
        link_video_youtube: "https://youtu.be/ECZdqbNSySE?si=tV07-6PIiIMlmXZI",
        upload_video: {
            ID: 444,
            id: 444,
            title: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
            filename: "750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
            filesize: 66186321,
            url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
            link: "https://tiem-tour.okhub-tech.com/homepage/750a1548924c1b0471bbe5edb20a971096708f9d-1/",
            alt: "",
            author: "1",
            description: "",
            caption: "",
            name: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
            status: "inherit",
            uploaded_to: 19,
            date: "2025-06-07 07:18:53",
            modified: "2025-06-07 07:20:25",
            menu_order: 0,
            mime_type: "video/mp4",
            type: "video",
            subtype: "mp4",
            icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/video.png",
            width: 1920,
            height: 1080,
        },
    },
    // {
    //     select: "video",
    //     img_pc: {
    //         ID: 445,
    //         id: 445,
    //         title: "Rectangle 1_11zon",
    //         filename: "Rectangle-1_11zon.webp",
    //         filesize: 296436,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/rectangle-1_11zon/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "rectangle-1_11zon",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:19:09",
    //         modified: "2025-06-07 07:19:09",
    //         menu_order: 0,
    //         mime_type: "image/webp",
    //         type: "image",
    //         subtype: "webp",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/default.png",
    //         width: 1600,
    //         height: 893,
    //         sizes: {
    //             thumbnail:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-150x150.webp",
    //             "thumbnail-width": 150,
    //             "thumbnail-height": 150,
    //             medium: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-300x167.webp",
    //             "medium-width": 300,
    //             "medium-height": 167,
    //             medium_large:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-768x429.webp",
    //             "medium_large-width": 768,
    //             "medium_large-height": 429,
    //             large: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1024x572.webp",
    //             "large-width": 1024,
    //             "large-height": 572,
    //             "1536x1536":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1536x857.webp",
    //             "1536x1536-width": 1536,
    //             "1536x1536-height": 857,
    //             "2048x2048":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //             "2048x2048-width": 1600,
    //             "2048x2048-height": 893,
    //         },
    //     },
    //     img_mb: {
    //         ID: 445,
    //         id: 445,
    //         title: "Rectangle 1_11zon",
    //         filename: "Rectangle-1_11zon.webp",
    //         filesize: 296436,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/rectangle-1_11zon/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "rectangle-1_11zon",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:19:09",
    //         modified: "2025-06-07 07:19:09",
    //         menu_order: 0,
    //         mime_type: "image/webp",
    //         type: "image",
    //         subtype: "webp",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/default.png",
    //         width: 1600,
    //         height: 893,
    //         sizes: {
    //             thumbnail:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-150x150.webp",
    //             "thumbnail-width": 150,
    //             "thumbnail-height": 150,
    //             medium: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-300x167.webp",
    //             "medium-width": 300,
    //             "medium-height": 167,
    //             medium_large:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-768x429.webp",
    //             "medium_large-width": 768,
    //             "medium_large-height": 429,
    //             large: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1024x572.webp",
    //             "large-width": 1024,
    //             "large-height": 572,
    //             "1536x1536":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1536x857.webp",
    //             "1536x1536-width": 1536,
    //             "1536x1536-height": 857,
    //             "2048x2048":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //             "2048x2048-width": 1600,
    //             "2048x2048-height": 893,
    //         },
    //     },
    //     link_video_youtube: "https://youtu.be/akeytNVcIy4?si=UBIJd4Dp3-GROf0r",
    //     upload_video: {
    //         ID: 444,
    //         id: 444,
    //         title: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
    //         filename: "750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
    //         filesize: 66186321,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/750a1548924c1b0471bbe5edb20a971096708f9d-1/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:18:53",
    //         modified: "2025-06-07 07:20:25",
    //         menu_order: 0,
    //         mime_type: "video/mp4",
    //         type: "video",
    //         subtype: "mp4",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/video.png",
    //         width: 1920,
    //         height: 1080,
    //     },
    // },
    // {
    //     select: "img",
    //     img_pc: {
    //         ID: 445,
    //         id: 445,
    //         title: "Rectangle 1_11zon",
    //         filename: "Rectangle-1_11zon.webp",
    //         filesize: 296436,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/rectangle-1_11zon/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "rectangle-1_11zon",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:19:09",
    //         modified: "2025-06-07 07:19:09",
    //         menu_order: 0,
    //         mime_type: "image/webp",
    //         type: "image",
    //         subtype: "webp",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/default.png",
    //         width: 1600,
    //         height: 893,
    //         sizes: {
    //             thumbnail:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-150x150.webp",
    //             "thumbnail-width": 150,
    //             "thumbnail-height": 150,
    //             medium: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-300x167.webp",
    //             "medium-width": 300,
    //             "medium-height": 167,
    //             medium_large:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-768x429.webp",
    //             "medium_large-width": 768,
    //             "medium_large-height": 429,
    //             large: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1024x572.webp",
    //             "large-width": 1024,
    //             "large-height": 572,
    //             "1536x1536":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1536x857.webp",
    //             "1536x1536-width": 1536,
    //             "1536x1536-height": 857,
    //             "2048x2048":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //             "2048x2048-width": 1600,
    //             "2048x2048-height": 893,
    //         },
    //     },
    //     img_mb: {
    //         ID: 445,
    //         id: 445,
    //         title: "Rectangle 1_11zon",
    //         filename: "Rectangle-1_11zon.webp",
    //         filesize: 296436,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/rectangle-1_11zon/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "rectangle-1_11zon",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:19:09",
    //         modified: "2025-06-07 07:19:09",
    //         menu_order: 0,
    //         mime_type: "image/webp",
    //         type: "image",
    //         subtype: "webp",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/default.png",
    //         width: 1600,
    //         height: 893,
    //         sizes: {
    //             thumbnail:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-150x150.webp",
    //             "thumbnail-width": 150,
    //             "thumbnail-height": 150,
    //             medium: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-300x167.webp",
    //             "medium-width": 300,
    //             "medium-height": 167,
    //             medium_large:
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-768x429.webp",
    //             "medium_large-width": 768,
    //             "medium_large-height": 429,
    //             large: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1024x572.webp",
    //             "large-width": 1024,
    //             "large-height": 572,
    //             "1536x1536":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon-1536x857.webp",
    //             "1536x1536-width": 1536,
    //             "1536x1536-height": 857,
    //             "2048x2048":
    //                 "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/Rectangle-1_11zon.webp",
    //             "2048x2048-width": 1600,
    //             "2048x2048-height": 893,
    //         },
    //     },
    //     link_video_youtube: "",
    //     upload_video: {
    //         ID: 444,
    //         id: 444,
    //         title: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
    //         filename: "750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
    //         filesize: 66186321,
    //         url: "https://tiem-tour.okhub-tech.com/wp-content/uploads/2025/06/750a1548924c1b0471bbe5edb20a971096708f9d-1.mp4",
    //         link: "https://tiem-tour.okhub-tech.com/homepage/750a1548924c1b0471bbe5edb20a971096708f9d-1/",
    //         alt: "",
    //         author: "1",
    //         description: "",
    //         caption: "",
    //         name: "750a1548924c1b0471bbe5edb20a971096708f9d-1",
    //         status: "inherit",
    //         uploaded_to: 19,
    //         date: "2025-06-07 07:18:53",
    //         modified: "2025-06-07 07:20:25",
    //         menu_order: 0,
    //         mime_type: "video/mp4",
    //         type: "video",
    //         subtype: "mp4",
    //         icon: "https://tiem-tour.okhub-tech.com/wp-includes/images/media/video.png",
    //         width: 1920,
    //         height: 1080,
    //     },
    // },
];
export default function SliderAutoVideo() {
    const isMobile = useIsMobile();
    const { initializeSwiper } = useSwiperBanner();
    return (
        <section className="banner !w-full">
            <div className="banner-wapper">
                <Swiper
                    className="swiper-banner_home"
                    effect="fade"
                    allowTouchMove={false}
                    modules={[EffectFade, Autoplay]}
                    onSwiper={initializeSwiper}
                >
                    {Array.isArray(mockData) &&
                        mockData.map((item: BannerItem, index: number) => {
                            if (
                                item?.select === "upload" &&
                                item?.upload_video?.url
                            ) {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="!w-full"
                                    >
                                        <video
                                            className="video_banner_upload"
                                            src={item.upload_video.url}
                                            muted
                                            playsInline
                                            // autoPlay
                                            loop={false}
                                        >
                                            <p>
                                                Your browser does not support
                                                the video tag.
                                            </p>
                                        </video>
                                    </SwiperSlide>
                                );
                            } else if (
                                item?.select === "video" &&
                                item?.link_video_youtube
                            ) {
                                const videoId = item.link_video_youtube
                                    .replace("https://youtu.be/", "")
                                    .split("?si=")[0];

                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="!w-full"
                                    >
                                        <div
                                            className="youtube-video-banner video-banner"
                                            data-video-id={videoId}
                                        ></div>
                                    </SwiperSlide>
                                );
                            } else if (
                                item?.select === "img" &&
                                item?.img_pc &&
                                item?.img_mb
                            ) {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="!w-full"
                                    >
                                        <Image
                                            src={
                                                isMobile
                                                    ? item.img_mb.url
                                                    : item.img_pc.url
                                            }
                                            alt={
                                                isMobile
                                                    ? item.img_mb.alt
                                                    : item.img_pc.alt
                                            }
                                            width={1600}
                                            height={1000}
                                            className="slider_home_img"
                                        />
                                    </SwiperSlide>
                                );
                            }
                            return null;
                        })}
                </Swiper>
                <div className="banner-wapper__overlay"></div>
                <div className="banner-wapper__overlay2"></div>
            </div>
        </section>
    );
}

export const SliderInCode = `
"use client";

import { useSwiperBanner } from "@/app/(main)/slider/_components/useSwiperBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function SliderAutoVideo() {
    const isMobile = useIsMobile();
    const { initializeSwiper } = useSwiperBanner();
    return (
        <section className="banner">
            <div className="banner-wapper">
                <Swiper
                    className="swiper-banner_home"
                    effect="fade"
                    allowTouchMove={false}
                    modules={[EffectFade, Autoplay]}
                    onSwiper={initializeSwiper}
                >
                    {Array.isArray(mockData) &&
                        mockData.map((item: BannerItem, index: number) => {
                            if (
                                item?.select === "upload" &&
                                item?.upload_video?.url
                            ) {
                                return (
                                    <SwiperSlide key={index}>
                                        <video
                                            className="video_banner_upload"
                                            src={item.upload_video.url}
                                            muted
                                            playsInline
                                            // autoPlay
                                            loop={false}
                                        >
                                            <p>
                                                Your browser does not support
                                                the video tag.
                                            </p>
                                        </video>
                                    </SwiperSlide>
                                );
                            } else if (
                                item?.select === "video" &&
                                item?.link_video_youtube
                            ) {
                                const videoId = item.link_video_youtube
                                    .replace("https://youtu.be/", "")
                                    .split("?si=")[0];

                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="youtube-video-banner video-banner"
                                            data-video-id={videoId}
                                        ></div>
                                    </SwiperSlide>
                                );
                            } else if (
                                item?.select === "img" &&
                                item?.img_pc &&
                                item?.img_mb
                            ) {
                                return (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={
                                                isMobile
                                                    ? item.img_mb.url
                                                    : item.img_pc.url
                                            }
                                            alt={
                                                isMobile
                                                    ? item.img_mb.alt
                                                    : item.img_pc.alt
                                            }
                                            width={1600}
                                            height={1000}
                                            className="slider_home_img"
                                        />
                                    </SwiperSlide>
                                );
                            }
                            return null;
                        })}
                </Swiper>
                <div className="banner-wapper__overlay"></div>
                <div className="banner-wapper__overlay2"></div>
            </div>
        </section>
    );
}
`;
