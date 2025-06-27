import Iframe from "@/components/customs/Iframe";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Example, ExampleCode } from "./example";

export default function FormBuilder() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">Website</TabsTrigger>
        <TabsTrigger value="v2">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://www.shadcn-form.com/playground" />
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%]">
              <Example />
            </div>
          </div>
          <CodeBlock language="jsx" filename="Example.jsx" code={ExampleCode} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
