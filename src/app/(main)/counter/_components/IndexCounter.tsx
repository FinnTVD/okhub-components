"use client";
import CountUpV2, {
  CountUpV2Code,
} from "@/app/(main)/countup/_components/CountUpV2";
import Iframe from "@/components/customs/Iframe";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexCounter() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">V2</TabsTrigger>
        <TabsTrigger value="v3">V3</TabsTrigger>
        <TabsTrigger value="v4">V4</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://ui.lndev.me/components/counter-animation-1" />
      </TabsContent>
      <TabsContent value="v2">
        <Iframe src="https://ui.lndev.me/components/counter-followers" />
      </TabsContent>
      <TabsContent value="v3">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <CountUpV2 />
          </div>
          <CodeBlock language="jsx" filename="TabV2.jsx" code={CountUpV2Code} />
        </div>
      </TabsContent>
      <TabsContent value="v4">
        <Iframe src="https://motion-primitives.com/docs/sliding-number" />
      </TabsContent>
    </Tabs>
  );
}
