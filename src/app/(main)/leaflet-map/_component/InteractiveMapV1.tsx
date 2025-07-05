"use client";

import IndexInteractiveMapV1, { MapExampleString } from "@/app/(main)/leaflet-map/_component/IndexInteractiveMap";
import Iframe from "@/components/customs/Iframe";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexInteractiveMap() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">Leaflet</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://ui.lndev.me/components/counter-animation-1" />
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <IndexInteractiveMapV1 />
          <CodeBlock
            language="jsx"
            filename="MapExample.jsx"
            code={MapExampleString}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
