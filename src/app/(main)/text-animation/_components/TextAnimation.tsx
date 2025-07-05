'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { CodeBlock } from '@/components/ui/code-block'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation configs - centralized
const ANIMATION_CONFIGS = {
  'masked rotate': { rotationZ: 10, opacity: 0, y: '110%', transformOrigin: 'center bottom' },
  'scrub opacity': { opacity: 0.2 },
  'scrub color': { color: '#22c55e' },
  'slide from left': { x: '-100%', opacity: 0 },
  'slide from right': { x: '100%', opacity: 0 },
  'slide from bottom': { y: '100%', opacity: 0 },
  'slide from top': { y: '-100%', opacity: 0 },
  'flip X': { rotationX: 90, opacity: 0, transformOrigin: 'center bottom' },
  'flip Y': { rotationY: 90, opacity: 0, transformOrigin: 'center left' },
  'scale up': { scale: 0.5, opacity: 0, transformOrigin: 'center center' },
  'scale down': { scale: 1.5, opacity: 0, transformOrigin: 'center center' },
}

// Target selectors
const SELECTORS = {
  paragraph: '[data-animate]',
  lines: '[data-animate] .line',
  words: '[data-animate] .word',
  letters: '[data-animate] .char',
}

export default function TextAnimation() {
  const [animationType, setAnimationType] = useState(Object.keys(ANIMATION_CONFIGS)[0])
  const [target, setTarget] = useState('words')
  const [duration, setDuration] = useState(0.5)
  const [stagger, setStagger] = useState(0.1)
  const [easing, setEasing] = useState('power1')
  const [animationStyle, setAnimationStyle] = useState('out')
  const [scrollTrigger, setScrollTrigger] = useState(false)

  const splitRef = useRef<SplitType | null>(null)

  const animate = () => {
    // Cleanup
    ScrollTrigger.getAll().forEach((t) => t.kill())
    splitRef.current?.revert()

    // Create split
    splitRef.current = new SplitType('[data-animate]', {
      types: 'lines,words,chars',
      tagName: 'span',
    })

    // Animate
    const fromConfig = ANIMATION_CONFIGS[animationType as keyof typeof ANIMATION_CONFIGS]
    if (!fromConfig) {
      console.warn(`Animation type "${animationType}" not found in ANIMATION_CONFIGS`)
      return
    }

    gsap.fromTo(SELECTORS[target as keyof typeof SELECTORS], fromConfig, {
      y: 0,
      x: 0,
      scale: 1,
      skewY: 0,
      skewX: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: 1,
      color: 'inherit',
      duration,
      stagger,
      ease: `${easing}.${animationStyle}`,
      scrollTrigger: scrollTrigger
        ? {
            trigger: '[data-animate]',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    })
  }

  useEffect(animate, [animationType, target, duration, stagger, easing, animationStyle, scrollTrigger])

  // Generate code samples based on current settings
  const getAnimationProps = () => {
    const config = ANIMATION_CONFIGS[animationType as keyof typeof ANIMATION_CONFIGS]
    return config || { opacity: 0 } // fallback if animation type not found
  }

  const getTargetClass = () => {
    const targets = {
      paragraph: '',
      lines: ' .line',
      words: ' .word',
      letters: ' .char',
    }
    return targets[target as keyof typeof targets]
  }

  // Returns the "to" properties for GSAP animation based on the selected animation config
  const getToProps = () => {
    const props = getAnimationProps()
    const toProps: Record<string, string | number> = {}

    if ('y' in props) toProps.y = '0%'
    if ('x' in props) toProps.x = '0%'
    if ('scale' in props) toProps.scale = 1
    if ('skewY' in props) toProps.skewY = 0
    if ('skewX' in props) toProps.skewX = 0
    if ('rotationX' in props) toProps.rotationX = 0
    if ('rotationY' in props) toProps.rotationY = 0
    if ('rotationZ' in props) toProps.rotationZ = 0
    toProps.opacity = 1
    toProps.color = 'inherit'

    return toProps
  }

  const codeJSX = `import { useEffect } from 'react'
import { gsap } from 'gsap'${
    scrollTrigger
      ? `
import { ScrollTrigger } from 'gsap/ScrollTrigger'`
      : ''
  }
import SplitType from 'split-type'

${
  scrollTrigger
    ? `if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}`
    : ''
}
export default function TextAnimation() {
  useEffect(() => {
    // Create split
    new SplitType('[data-animate]', {
      types: 'lines,words,chars',
      tagName: 'span'
    })

    // Animate
    gsap.fromTo(
      '[data-animate]${getTargetClass()}',
      ${JSON.stringify(getAnimationProps(), null, 6)},
      {
        ${Object.entries(getToProps())
          .map(([key, value]) => `${key}: ${typeof value === 'string' ? `'${value}'` : value}`)
          .join(',\n        ')},
        duration: ${duration},
        stagger: ${stagger},
        ease: '${easing}.${animationStyle}'${
          scrollTrigger
            ? `,
        scrollTrigger: {
          trigger: '[data-animate]',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }`
            : ''
        }
      }
    )
  }, [])

  return (
    <div data-animate className="text-4xl font-medium">
      Your animated text content here
    </div>
  )
}`

  const codeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSAP Text Animation</title>
    <style>
        .text-content {
            font-size: 2.5rem;
            font-weight: 500;
            line-height: 1.2;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
    </style>
</head>
<body>
    <div data-animate class="text-content">
        Your animated text content here
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/split-type"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>${
      scrollTrigger
        ? `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>`
        : ''
    }

    <script>
        ${scrollTrigger ? 'gsap.registerPlugin(ScrollTrigger)\n' : ''}        // Create split
        let typeSplit = new SplitType('[data-animate]', {
            types: 'lines,words,chars',
            tagName: 'span'
        })

        // Animate
        gsap.fromTo(
            '[data-animate]${getTargetClass()}', 
            ${JSON.stringify(getAnimationProps(), null, 12)},
            {
                ${Object.entries(getToProps())
                  .map(([key, value]) => `${key}: ${typeof value === 'string' ? `'${value}'` : value}`)
                  .join(',\n                ')},
                duration: ${duration},
                stagger: ${stagger},
                ease: '${easing}.${animationStyle}'${
                  scrollTrigger
                    ? `,
                scrollTrigger: {
                    trigger: '[data-animate]',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }`
                    : ''
                }
            }
        )
    </script>
</body>
</html>`

  return (
    <div>
      <div className=' flex'>
        {/* Left Sidebar */}
        <div className='w-80 bg-gray-900 text-white p-6 flex flex-col'>
          <div className='text-4xl font-light text-gray-400 mb-8'>GSAP Text Animations</div>

          <div className='space-y-6 flex-1'>
            <div>
              <label className='text-sm font-medium mb-3 block'>Target:</label>
              <div className='grid grid-cols-2 gap-2'>
                {['paragraph', 'words', 'lines', 'letters'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setTarget(option)}
                    className={`p-2 rounded text-sm transition-colors ${
                      target === option ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-sm'>duration:</label>
                <span className='text-sm text-gray-400'>{duration.toFixed(2)}sec</span>
              </div>
              <input
                type='range'
                min='0.1'
                max='2'
                step='0.1'
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className='w-full h-2 slider'
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-sm'>stagger:</label>
                <span className='text-sm text-gray-400'>{stagger.toFixed(2)}sec</span>
              </div>
              <input
                type='range'
                min='0'
                max='0.5'
                step='0.05'
                value={stagger}
                onChange={(e) => setStagger(parseFloat(e.target.value))}
                className='w-full h-2 slider'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm mb-2 block'>Easing</label>
                <select
                  value={easing}
                  onChange={(e) => setEasing(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'>
                  <option value='power1'>power1</option>
                  <option value='power2'>power2</option>
                  <option value='power3'>power3</option>
                  <option value='back'>back</option>
                  <option value='elastic'>elastic</option>
                </select>
              </div>
              <div>
                <label className='text-sm mb-2 block'>Type</label>
                <select
                  value={animationStyle}
                  onChange={(e) => setAnimationStyle(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'>
                  <option value='out'>out</option>
                  <option value='in'>in</option>
                  <option value='inOut'>inOut</option>
                </select>
              </div>
            </div>

            <label htmlFor='scrollTriggerInput' className='flex items-center justify-between'>
              <span className='text-sm'>Scroll Trigger</span>
              <input
                type='checkbox'
                id='scrollTriggerInput'
                checked={scrollTrigger}
                onChange={(e) => setScrollTrigger(e.target.checked)}
                className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
              />
            </label>
          </div>
        </div>

        {/* Right Content */}
        <div className='flex-1 bg-gradient-to-br from-purple-100 to-purple-200 p-8 flex flex-col'>
          <div className='flex gap-2 mb-8 max-w-7xl flex-wrap'>
            {Object.keys(ANIMATION_CONFIGS).map((type) => (
              <Button
                key={type}
                variant={animationType === type ? 'default' : 'outline'}
                onClick={() => setAnimationType(type)}
                className={animationType === type ? 'bg-gray-900 text-white' : ''}>
                {type}
              </Button>
            ))}
          </div>

          <div className='flex-1 flex items-center justify-center'>
            <div className='max-w-7xl'>
              <div data-animate className='mb-8 text-4xl font-medium font-mono text-gray-900 leading-tight'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nam mollitia neque minima voluptates,
                fugit ipsa magnam tempore totam dolorum ea perferendis! Obcaecati voluptas et cupiditate, in distinctio
                perferendis aperiam.
              </div>
              <Button onClick={animate} variant='outline' className='flex items-center gap-2 bg-transparent'>
                play again
                <ArrowRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-50'>
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-800'>React/JSX Code</h3>
          <CodeBlock language='jsx' filename='text-animation.jsx' code={codeJSX} />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-800'>HTML Code</h3>
          <CodeBlock language='html' filename='text-animation.html' code={codeHtml} />
        </div>
      </div>
    </div>
  )
}
