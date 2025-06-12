"use client";
import Iframe from "@/components/customs/Iframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexCounter() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://ui.lndev.me/components/counter-animation-1" />
      </TabsContent>
      <TabsContent value="v2">
        <Iframe src="https://ui.lndev.me/components/counter-followers" />
      </TabsContent>
    </Tabs>
  );
}
