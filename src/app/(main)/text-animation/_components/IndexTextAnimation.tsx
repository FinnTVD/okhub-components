'use client'
import TextAnimation from '@/app/(main)/text-animation/_components/TextAnimation'
import TextAnimationExample from '@/app/(main)/text-animation/_components/TextAnimationExample'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function IndexTextAnimation() {
  return (
    <Tabs defaultValue='v1' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='v1'>GSAP text animation generator</TabsTrigger>
        <TabsTrigger value='v2'>Example</TabsTrigger>
      </TabsList>
      <TabsContent value='v1'>
        <TextAnimation />
      </TabsContent>
      <TabsContent value='v2'>
        <TextAnimationExample />
      </TabsContent>
    </Tabs>
  )
}
