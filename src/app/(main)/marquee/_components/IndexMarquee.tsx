"use client";

import Iframe from "@/components/customs/Iframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function IndexMarquee() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="v1">V1</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://magicui.design/docs/components/marquee" />
      </TabsContent>
    </Tabs>
  );
}
