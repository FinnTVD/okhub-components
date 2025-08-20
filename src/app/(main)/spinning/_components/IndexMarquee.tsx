"use client";

import Iframe from "@/components/customs/Iframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function IndexSpinning() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="v1">Text</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://motion-primitives.com/docs/spinning-text" />
      </TabsContent>
    </Tabs>
  );
}
