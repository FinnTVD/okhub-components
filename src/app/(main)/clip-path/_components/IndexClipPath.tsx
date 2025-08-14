"use client";
import { CardClipPathCode } from "@/app/(main)/clip-path/_components/v1/CardClipPath";
import HoverThumbnail from "@/app/(main)/clip-path/_components/v1/HoverThumbnail";
import ScrollClipPath from "@/app/(main)/clip-path/_components/v2/ScrollClipPath";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexClipPath() {
  return (
    <Tabs defaultValue="v2" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v2">Scroll</TabsTrigger>
        <TabsTrigger value="v1">Thumbnail</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <div className="grid grid-cols-2">
          <HoverThumbnail />
          <div className="relative">
            <div className="absolute top-0 left-0 w-full">
              <CodeBlock
                language="tsx"
                filename="CardClipPath.tsx"
                code={CardClipPathCode}
              />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="v2">
        <ScrollClipPath />
      </TabsContent>
    </Tabs>
  );
}
