import SocialV2, {
  SocialV2Code,
} from "@/app/(main)/social/_components/SocialV2";
import Iframe from "@/components/customs/Iframe";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function IndexSocial() {
  return (
    <Tabs defaultValue="v1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="v1">Hover</TabsTrigger>
        <TabsTrigger value="v2">Share</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <Iframe src="https://ui.lndev.me/components/link-hover" />
      </TabsContent>
      <TabsContent value="v2">
        <div className="grid grid-cols-2">
          <div className="h-screen w-full flex justify-center items-center">
            <SocialV2 />
          </div>
          <CodeBlock language="jsx" filename="TabV2.jsx" code={SocialV2Code} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
