"use client";
import { useEffect, useRef } from "react";
import { Swiper } from "swiper";

interface YouTubePlayerOptions {
    events: {
        onStateChange: (event: { data: number }) => void;
    };
}

interface YouTubePlayer {
    PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
    };
    Player: new (
        element: HTMLElement,
        options: YouTubePlayerOptions
    ) => unknown;
}

declare global {
    interface Window {
        YT: YouTubePlayer;
        onYouTubePlayerAPIReady: () => void;
    }
}

export const useSwiperBanner = () => {
    const swiperRef = useRef<Swiper | null>(null);
    const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSlide = (index: number, swiper: Swiper) => {
        // Clear previous timeout
        if (videoTimeoutRef.current) {
            clearTimeout(videoTimeoutRef.current);
        }

        const activeSlide = swiper.slides[index];
        const iframe = activeSlide.querySelector(".youtube-video-banner");
        const video = activeSlide.querySelector("video") as HTMLVideoElement;
        const image = activeSlide.querySelector("img");

        if (iframe) {
            const iframeEl = iframe.querySelector(
                "iframe"
            ) as HTMLIFrameElement;
            if (iframeEl) {
                iframeEl.onload = () => {
                    iframeEl.contentWindow?.postMessage(
                        '{"event":"command","func":"playVideo","args":""}',
                        "*"
                    );
                    iframeEl.contentWindow?.postMessage(
                        '{"event":"listening","id":""}',
                        "*"
                    );
                };
                iframeEl.contentWindow?.postMessage(
                    '{"event":"command","func":"playVideo","args":""}',
                    "*"
                );
            }
        }

        if (video) {
            video.play();
        }

        if (image) {
            swiper.autoplay?.start();
            if (
                swiper.params.autoplay &&
                typeof swiper.params.autoplay === "object"
            ) {
                if (swiper.realIndex < swiper.slides.length - 1) {
                    swiper.params.autoplay.delay = 3000;
                } else {
                    setTimeout(() => {
                        swiper.slideTo(0);
                    }, 3000);
                }
            }
        }
    };

    const handleVideoEnded = (swiper?: Swiper) => {
        const targetSwiper = swiper || swiperRef.current;
        if (targetSwiper) {
            // Dừng autoplay trước khi chuyển slide
            targetSwiper.autoplay?.stop();

            // Kiểm tra xem có phải slide cuối không
            if (targetSwiper.realIndex < targetSwiper.slides.length - 1) {
                targetSwiper.slideNext();
            } else {
                // Nếu là slide cuối, quay về slide đầu
                targetSwiper.slideTo(0);
            }
        } else {
            console.log("No swiper found!");
        }
    };

    const createYouTubePlayerBanner = (videoId: string) => {
        const iframe = document.createElement("iframe");
        iframe.setAttribute(
            "src",
            `https://www.youtube.com/embed/${videoId}?loop=0&controls=0&showinfo=0&autohide=1&modestbranding=1&frameborder=0&autoplay=0&mute=1&enablejsapi=1&playlist=${videoId}&rel=0`
        );
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("class", "iframe-ytb");
        return iframe;
    };

    const initializeYouTubeAPI = () => {
        if (!document.querySelector('script[src*="youtube/iframe_api"]')) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    };

    const setupVideoListeners = (swiper: Swiper) => {
        const videoBannerUpload = document.querySelectorAll(
            ".video_banner_upload"
        );
        videoBannerUpload.forEach((item) => {
            item.addEventListener("ended", () => handleVideoEnded(swiper));
        });
    };

    const setupYouTubeVideos = (swiper: Swiper) => {
        const youtubeVideosBanner = document.querySelectorAll(".video-banner");
        youtubeVideosBanner.forEach((video) => {
            const videoId = video.getAttribute("data-video-id");
            if (videoId) {
                const iframe = createYouTubePlayerBanner(videoId);
                video.appendChild(iframe);

                // Đảm bảo YouTube API đã sẵn sàng
                if (window.YT && window.YT.Player) {
                    new window.YT.Player(iframe, {
                        events: {
                            onStateChange: (event: { data: number }) => {
                                if (
                                    event.data === window.YT.PlayerState.ENDED
                                ) {
                                    handleVideoEnded(swiper);
                                }
                            },
                        },
                    });
                } else {
                    // Fallback nếu API chưa sẵn sàng
                    window.onYouTubePlayerAPIReady = () => {
                        new window.YT.Player(iframe, {
                            events: {
                                onStateChange: (event: { data: number }) => {
                                    if (
                                        event.data ===
                                        window.YT.PlayerState.ENDED
                                    ) {
                                        handleVideoEnded(swiper);
                                    }
                                },
                            },
                        });
                    };
                }
            }
        });
    };

    const initializeSwiper = (swiper: Swiper) => {
        swiperRef.current = swiper;

        swiper.on("slideChange", () => {
            swiper.autoplay?.stop();
            handleSlide(swiper.realIndex, swiper);
        });

        // Setup video listeners with swiper instance
        setupVideoListeners(swiper);
        setupYouTubeVideos(swiper);

        // Initialize first slide
        handleSlide(0, swiper);
    };

    useEffect(() => {
        initializeYouTubeAPI();
    }, []);

    return {
        initializeSwiper,
        handleSlide,
        handleVideoEnded,
    };
};

export const useSwiperBannerCode = `
"use client";
import { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';

interface YouTubePlayerOptions {
  events: {
    onStateChange: (event: {data: number}) => void
  }
}

interface YouTubePlayer {
  PlayerState: {
    ENDED: number
    PLAYING: number
    PAUSED: number
  }
  Player: new (element: HTMLElement, options: YouTubePlayerOptions) => unknown
}

declare global {
  interface Window {
    YT: YouTubePlayer
    onYouTubePlayerAPIReady: () => void
  }
}

export const useSwiperBanner = () => {
  const swiperRef = useRef<Swiper | null>(null)
  const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSlide = (index: number, swiper: Swiper) => {
    // Clear previous timeout
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current)
    }

    const activeSlide = swiper.slides[index]
    const iframe = activeSlide.querySelector('.youtube-video-banner')
    const video = activeSlide.querySelector('video') as HTMLVideoElement
    const image = activeSlide.querySelector('img')

    if (iframe) {
      const iframeEl = iframe.querySelector('iframe') as HTMLIFrameElement
      if (iframeEl) {
        iframeEl.onload = () => {
          iframeEl.contentWindow?.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*',
          )
          iframeEl.contentWindow?.postMessage(
            '{"event":"listening","id":""}',
            '*',
          )
        }
        iframeEl.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*',
        )
      }
    }

    if (video) {
      video.play()
    }

    if (image) {
      swiper.autoplay?.start()
      if (
        swiper.params.autoplay &&
        typeof swiper.params.autoplay === 'object'
      ) {
        if (swiper.realIndex < swiper.slides.length - 1) {
          swiper.params.autoplay.delay = 3000
        } else {
          setTimeout(() => {
            swiper.slideTo(0)
          }, 3000)
        }
      }
    }
  }

  const handleVideoEnded = (swiper?: Swiper) => {
    const targetSwiper = swiper || swiperRef.current
    if (targetSwiper) {
      // Dừng autoplay trước khi chuyển slide
      targetSwiper.autoplay?.stop()

      // Kiểm tra xem có phải slide cuối không
      if (targetSwiper.realIndex < targetSwiper.slides.length - 1) {
        targetSwiper.slideNext()
      } else {
        // Nếu là slide cuối, quay về slide đầu
        targetSwiper.slideTo(0)
      }
    } else {
      console.log('No swiper found!')
    }
  }

  const createYouTubePlayerBanner = (videoId: string) => {
    const iframe = document.createElement('iframe')
    // thay '' thành giấu phù hợn và ! $
    iframe.setAttribute(
      'src',
      'https://www.youtube.com/embed/!{videoId}?loop=0&controls=0&showinfo=0&autohide=1
      &modestbranding=1&frameborder=0&autoplay=0&mute=1&enablejsapi=1&playlist=!{videoId}&rel=0',
    )
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allow', 'autoplay; encrypted-media')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('class', 'iframe-ytb')
    return iframe
  }

  const initializeYouTubeAPI = () => {
    if (!document.querySelector('script[src*="youtube/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }
  }

  const setupVideoListeners = (swiper: Swiper) => {
    const videoBannerUpload = document.querySelectorAll('.video_banner_upload')
    videoBannerUpload.forEach((item) => {
      item.addEventListener('ended', () => handleVideoEnded(swiper))
    })
  }

  const setupYouTubeVideos = (swiper: Swiper) => {
    const youtubeVideosBanner = document.querySelectorAll('.video-banner')
    youtubeVideosBanner.forEach((video) => {
      const videoId = video.getAttribute('data-video-id')
      if (videoId) {
        const iframe = createYouTubePlayerBanner(videoId)
        video.appendChild(iframe)

        // Đảm bảo YouTube API đã sẵn sàng
        if (window.YT && window.YT.Player) {
          new window.YT.Player(iframe, {
            events: {
              onStateChange: (event: {data: number}) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  handleVideoEnded(swiper)
                }
              },
            },
          })
        } else {
          // Fallback nếu API chưa sẵn sàng
          window.onYouTubePlayerAPIReady = () => {
            new window.YT.Player(iframe, {
              events: {
                onStateChange: (event: {data: number}) => {
                  if (event.data === window.YT.PlayerState.ENDED) {
                    handleVideoEnded(swiper)
                  }
                },
              },
            })
          }
        }
      }
    })
  }

  const initializeSwiper = (swiper: Swiper) => {
    swiperRef.current = swiper

    swiper.on('slideChange', () => {
      swiper.autoplay?.stop()
      handleSlide(swiper.realIndex, swiper)
    })

    // Setup video listeners with swiper instance
    setupVideoListeners(swiper)
    setupYouTubeVideos(swiper)

    // Initialize first slide
    handleSlide(0, swiper)
  }

  useEffect(() => {
    initializeYouTubeAPI()
  }, [])

  return {
    initializeSwiper,
    handleSlide,
    handleVideoEnded,
  }
}
`;
