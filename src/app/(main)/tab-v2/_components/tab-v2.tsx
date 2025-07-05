import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedTabsCode } from "./animated-tabs";
import { Preview, PreviewCode } from "./preview";

export default function TabV2() {
  return (
    <Tabs defaultValue="Preview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Preview">Preview</TabsTrigger>
        <TabsTrigger value="Code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="Preview">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%]">
              <Preview />
            </div>
          </div>
          <CodeBlock
            language="jsx"
            filename="AnimatedTabs.jsx"
            code={AnimatedTabsCode}
          />
        </div>
      </TabsContent>
      <TabsContent value="Code">
        <div className="grid grid-cols-2 gap-4">
          <CodeBlock language="jsx" filename="Preview.jsx" code={PreviewCode} />
          <CodeBlock
            language="jsx"
            filename="AnimatedTabs.jsx"
            code={AnimatedTabsCode}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
