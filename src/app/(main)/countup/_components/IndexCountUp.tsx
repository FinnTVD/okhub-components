import CountUpV2, { CountUpV2Code } from "@/app/(main)/countup/_components/CountUpV2";

import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function IndexCountUp() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">Hover</TabsTrigger>
        <TabsTrigger value="v2">Share</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">Donate cho mình</TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <CountUpV2 />
          </div>
          <CodeBlock language="jsx" filename="TabV2.jsx" code={CountUpV2Code} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
