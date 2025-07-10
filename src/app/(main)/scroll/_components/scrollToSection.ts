'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * Scrolls smoothly to a section with the given element ID using GSAP.
 * @param elementId - The ID of the element to scroll to.
 * @param duration - Optional duration of the scroll animation in seconds (default: 1s).
 * @param offsetRem - Optional offset from the top in rem (default: 0rem).
 */
export function scrollToSection(
	elementId: string,
	duration: number = 1,
	offsetRem: number = 0,
): void {
	const targetElement = document.getElementById(elementId)

	if (!targetElement) {
		console.warn(`Element with ID '${elementId}' not found.`)
		return
	}

	const offsetPx =
		offsetRem * parseFloat(getComputedStyle(document.documentElement).fontSize)
	const targetPosition =
		targetElement.getBoundingClientRect().top + window.scrollY - offsetPx

	gsap.to(window, {
		duration: duration,
		scrollTo: { y: targetPosition, autoKill: true },
		ease: 'power2.out',
	})
}
