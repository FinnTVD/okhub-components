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
        <TabsTrigger value="v2">V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <AnimatedV1 />
      </TabsContent>
      <TabsContent value="v2">
        <CodeBlock
          language="tsx"
          filename="AnimatedV1.tsx"
          code={animatedV1Code}
        />
      </TabsContent>
    </Tabs>
  );
}
