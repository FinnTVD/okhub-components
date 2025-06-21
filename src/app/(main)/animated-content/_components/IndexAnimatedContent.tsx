"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedV1 from "./AnimatedV1";
import { animatedV1Code } from "./AnimatedV1";
import { CodeBlock } from "@/components/ui/code-block";

export default function IndexCounter() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">Animation</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        Donate để mình có động lực làm nhiều hơn nữa
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2 ">
          <AnimatedV1 />
          <CodeBlock
            language="tsx"
            filename="AnimatedV1.tsx"
            code={animatedV1Code}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
