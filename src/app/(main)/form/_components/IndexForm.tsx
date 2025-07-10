import Iframe from "@/components/customs/Iframe";
import FormSignIn, {
  FormSignInCode,
} from "@/app/(main)/form/_components/FormSignIn";
import FormSignUp, {
  FormSignUpCode,
} from "@/app/(main)/form/_components/FormSignUp";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Example, ExampleCode } from "@/app/(main)/form/_components/example";

export default function IndexForm() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="v1">Login</TabsTrigger>
        <TabsTrigger value="v2">Register</TabsTrigger>
        <TabsTrigger value="v3">Website Form Builder</TabsTrigger>
        <TabsTrigger value="v4">Login V2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%] sticky top-0">
              <FormSignIn />
            </div>
          </div>
          <CodeBlock
            language="tsx"
            filename="FormSignIn.tsx"
            code={FormSignInCode}
          />
        </div>
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%]">
              <FormSignUp />
            </div>
          </div>
          <CodeBlock
            language="tsx"
            filename="FormSignUp.tsx"
            code={FormSignUpCode}
          />
        </div>
      </TabsContent>
      <TabsContent value="v3">
        <Iframe src="https://www.shadcn-form.com/playground" />
      </TabsContent>
      <TabsContent value="v4">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%]">
              <Example />
            </div>
          </div>
          <CodeBlock language="tsx" filename="Example.tsx" code={ExampleCode} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
