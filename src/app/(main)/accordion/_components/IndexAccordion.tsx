import AccordionV1 from "@/app/(main)/accordion/_components/AccordionV1";
import AccordionV2 from "@/app/(main)/accordion/_components/AccordionV2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexAccordion() {
  return (
    <Tabs defaultValue="v1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <AccordionV1 />
      </TabsContent>
      <TabsContent value="v2">
        <AccordionV2 />
      </TabsContent>
    </Tabs>
  );
}
