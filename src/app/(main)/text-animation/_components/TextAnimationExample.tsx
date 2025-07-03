import { useEffect } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'

export default function TextAnimation() {
  useEffect(() => {
    // Create split
    new SplitType('[data-animate]', {
      types: 'lines,words,chars',
      tagName: 'span',
    })

    // Animate
    gsap.fromTo(
      '[data-animate] .word',
      {
        color: '#22c55e',
      },
      {
        opacity: 1,
        color: 'inherit',
        duration: 0.5,
        stagger: 0.1,
        ease: 'power1.out',
      }
    )
  }, [])

  return (
    <div data-animate className='text-4xl font-medium'>
      Your animated text content here
    </div>
  )
}
