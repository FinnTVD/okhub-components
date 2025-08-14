"use client";

import IndexInteractiveMapV1, {
  MapExampleString,
} from "@/app/(main)/leaflet-map/_component/IndexInteractiveMap";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexInteractiveMap() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">Leaflet</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
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
