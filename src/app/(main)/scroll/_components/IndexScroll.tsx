"use client";
import { example1Code } from "@/app/(main)/scroll/_components/constant";
import scrollToElement, {
  scrollToElementCode,
} from "@/app/(main)/scroll/_components/scrollToElement";
import scrollToElementNoGsap, {
  scrollToElementNoGsapCode,
} from "@/app/(main)/scroll/_components/scrollToElementNoGsap";
import { scrollToSection } from "@/app/(main)/scroll/_components/scrollToSection";
import ScrollDrivenLayout from "@/app/(main)/scroll/_components/v3/ScrollDrivenLayout";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheetProvider from "@/provider/SheetProvider";
import { useState } from "react";

export default function IndexScroll() {
  const [open, setOpen] = useState(false);
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="v1">
          Scroll to element in container With Gsap
        </TabsTrigger>
        <TabsTrigger value="v2">
          Scroll to element in container No Gsap
        </TabsTrigger>
        <TabsTrigger value="v3">
          Scroll-Driven Layout Glides Cards On The Fly
        </TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <div className="h-screen w-full flex justify-center items-center gap-x-6">
              <Button onClick={() => setOpen(true)}>
                <span>Open Sheet</span>
              </Button>
              <SheetProvider
                open={open}
                setOpen={setOpen}
                className="!w-[50rem] !min-w-[50rem] !max-w-[50rem] !p-0 !m-0"
              >
                <div
                  id="container_book_now"
                  className="relative h-screen w-full overflow-y-auto"
                >
                  <div className="sticky top-4 left-0 w-full z-50 h-fit flex items-center justify-between">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Button
                        key={index}
                        onClick={() =>
                          scrollToElement(
                            "container_book_now",
                            `taskbar-${index}`,
                            1,
                            5
                          )
                        }
                      >
                        <span>Taskbar {index}</span>
                      </Button>
                    ))}
                  </div>
                  <div
                    id="taskbar-0"
                    className="w-full h-full bg-red-500"
                  ></div>
                  <div
                    id="taskbar-1"
                    className="w-full h-full bg-green-500"
                  ></div>
                  <div
                    id="taskbar-2"
                    className="w-full h-full bg-blue-500"
                  ></div>
                  <div
                    id="taskbar-3"
                    className="w-full h-full bg-yellow-500"
                  ></div>
                  <div
                    id="taskbar-4"
                    className="w-full h-full bg-purple-500"
                  ></div>
                </div>
              </SheetProvider>
              <Button onClick={() => scrollToSection("example1")}>
                <span>Preview Example</span>
              </Button>
            </div>
          </div>
          <div className="h-screen w-full flex flex-col space-y-10">
            <CodeBlock
              language="tsx"
              filename="scrollToElement.tsx"
              code={scrollToElementCode}
            />
          </div>
        </div>
        <div className="w-full h-fit" id="example1">
          <CodeBlock
            language="tsx"
            filename="example1.tsx"
            code={example1Code}
          />
        </div>
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center gap-x-8">
            <Button onClick={() => setOpen(true)}>
              <span>Open Sheet</span>
            </Button>
            <SheetProvider
              open={open}
              setOpen={setOpen}
              className="!w-[50rem] !min-w-[50rem] !max-w-[50rem] !p-0 !m-0"
            >
              <div
                id="container_book_now_no_gsap"
                className="relative h-screen w-full overflow-y-auto"
              >
                <div className="sticky top-4 left-0 w-full z-50 h-fit flex items-center justify-between">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Button
                      key={index}
                      onClick={() =>
                        scrollToElementNoGsap(
                          "container_book_now_no_gsap",
                          `taskbar-${index}`,
                          1,
                          5
                        )
                      }
                    >
                      <span>Taskbar {index}</span>
                    </Button>
                  ))}
                </div>
                <div id="taskbar-0" className="w-full h-full bg-red-500"></div>
                <div
                  id="taskbar-1"
                  className="w-full h-full bg-green-500"
                ></div>
                <div id="taskbar-2" className="w-full h-full bg-blue-500"></div>
                <div
                  id="taskbar-3"
                  className="w-full h-full bg-yellow-500"
                ></div>
                <div
                  id="taskbar-4"
                  className="w-full h-full bg-purple-500"
                ></div>
              </div>
            </SheetProvider>
            <Button onClick={() => scrollToSection("example1")}>
              <span>Preview Example</span>
            </Button>
          </div>
          <div className="h-screen w-full flex flex-col space-y-10">
            <CodeBlock
              language="tsx"
              filename="scrollToElement.tsx"
              code={scrollToElementNoGsapCode}
            />
          </div>
        </div>
        <div className="w-full h-fit" id="example1">
          <CodeBlock
            language="tsx"
            filename="example2.tsx"
            code={example1Code}
          />
        </div>
      </TabsContent>
      <TabsContent value="v3">
        <ScrollDrivenLayout />
      </TabsContent>
    </Tabs>
  );
}
