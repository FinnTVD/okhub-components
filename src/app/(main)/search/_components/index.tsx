import SearchItem, {
    SearchItemHtmlCode,
    SearchItemJsCode,
} from "@/app/(main)/search/_components/SearchItem";
import { CodeBlock } from "@/components/ui/code-block";

export default function SearchItemPage() {
    return (
        <div className="w-full relative">
            <div className="grid grid-cols-1 gap-4">
                <CodeBlock
                    language="html"
                    filename="index.html"
                    code={SearchItemHtmlCode}
                />
                <CodeBlock
                    language="javascript"
                    filename="app.js"
                    code={SearchItemJsCode}
                />
            </div>
            <div className="w-full p-[2rem]">
                <SearchItem />
            </div>
        </div>
    );
}
