import SwiperParallax, {
    SwiperParallaxCode,
} from "@/app/(main)/slider/_components/Parallax";
import SliderAutoVideo, {
    SliderInCode,
} from "@/app/(main)/slider/_components/SliderAutoVideo";
import { useSwiperBannerCode } from "@/app/(main)/slider/_components/useSwiperBanner";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexSlider() {
    return (
        <Tabs defaultValue="v1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="v1">Slider Auto Video</TabsTrigger>
                <TabsTrigger value="v2">Slider Parallax</TabsTrigger>
            </TabsList>
            <TabsContent value="v1">
                <div className="w-full relative">
                    <div className="grid grid-cols-2 gap-4">
                        <CodeBlock
                            language="jsx"
                            filename="useSwiperBanner.jsx"
                            code={useSwiperBannerCode}
                        />
                        <CodeBlock
                            language="jsx"
                            filename="SliderAutoVideo.jsx"
                            code={SliderInCode}
                        />
                    </div>
                    <div className="w-full p-[2rem]">
                        <SliderAutoVideo />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="v2">
                <div className="w-full relative">
                    <div className="grid grid-cols-2 gap-4">
                        <CodeBlock
                            language="jsx"
                            filename="SwiperParallax.jsx"
                            code={SwiperParallaxCode}
                        />
                        <div className="h-[30rem]">
                            <SwiperParallax />
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}
