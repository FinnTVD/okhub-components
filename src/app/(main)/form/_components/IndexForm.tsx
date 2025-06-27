import FormSignIn, {
  FormSignInCode,
} from "@/app/(main)/form/_components/FormSignIn";
import FormSignUp, {
  FormSignUpCode,
} from "@/app/(main)/form/_components/FormSignUp";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndexForm() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">Login</TabsTrigger>
        <TabsTrigger value="v2">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-[50%] sticky top-0">
              <FormSignIn />
            </div>
          </div>
          <CodeBlock
            language="jsx"
            filename="FormSignIn.jsx"
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
            language="jsx"
            filename="FormSignUp.jsx"
            code={FormSignUpCode}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
