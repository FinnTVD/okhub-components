"use client";
import Iframe from "@/components/customs/Iframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function IndexFileUpload() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://originui.com/file-upload" />
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2"></div>
      </TabsContent>
    </Tabs>
  );
}
