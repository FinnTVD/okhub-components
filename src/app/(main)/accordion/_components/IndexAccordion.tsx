import AccordionV1, {
  AccordionV1Code,
} from "@/app/(main)/accordion/_components/AccordionV1";
import AccordionV2 from "@/app/(main)/accordion/_components/AccordionV2";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexAccordion() {
  return (
    <Tabs defaultValue="v1" className="w-full min-w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">V1</TabsTrigger>
        <TabsTrigger value="v2">V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <div className="grid grid-cols-2">
          <AccordionV1 />
          <CodeBlock
            language="jsx"
            filename="DummyComponent.jsx"
            highlightLines={[9, 13, 14, 18]}
            code={AccordionV1Code}
          />
        </div>
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <AccordionV2 />
          <CodeBlock
            language="jsx"
            filename="DummyComponent.jsx"
            highlightLines={[9, 13, 14, 18]}
            code={AccordionV1Code}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
