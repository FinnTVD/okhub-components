"use client";
import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface SheetProviderProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

const SheetProvider: FC<SheetProviderProps> = ({
  open,
  setOpen,
  children,
  className,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className={cn(className)}>
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SheetProvider;
