'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * Scrolls smoothly to a section inside a scrollable parent element using GSAP.
 * @param containerId - The ID of the scrollable container.
 * @param elementId - The ID of the element to scroll to.
 * @param duration - Optional duration of the scroll animation in seconds (default: 1s).
 * @param offsetRem - Optional offset from the top in rem (default: 0rem).
 */

export default function scrollToElement(
	containerId: string,
	elementId: string,
	duration: number = 1,
	offsetRem: number = 0,
): void {
	const container = document.getElementById(containerId)
	const targetElement = document.getElementById(elementId)

	if (!container) {
		console.warn(`Container with ID '${containerId}' not found.`)
		return
	}
	if (!targetElement) {
		console.warn(`Element with ID '${elementId}' not found.`)
		return
	}

	// Chuyển đổi offset từ rem sang pixel
	const offsetPx =
		offsetRem * parseFloat(getComputedStyle(document.documentElement).fontSize)

	// Vị trí của phần tử trong container
	const containerRect = container.getBoundingClientRect()
	const targetRect = targetElement.getBoundingClientRect()

	// Tính toán vị trí scroll đến (tương đối với container)
	const targetPosition = targetRect.top - containerRect.top + container.scrollTop - offsetPx

	gsap.to(container, {
		duration: duration,
		scrollTo: { y: targetPosition, autoKill: true },
		ease: 'power2.out',
	})
}

export const scrollToElementCode = `
'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * Scrolls smoothly to a section inside a scrollable parent element using GSAP.
 * @param containerId - The ID of the scrollable container.
 * @param elementId - The ID of the element to scroll to.
 * @param duration - Optional duration of the scroll animation in seconds (default: 1s).
 * @param offsetRem - Optional offset from the top in rem (default: 0rem).
 */

export default function scrollToElement(
	containerId: string,
	elementId: string,
	duration: number = 1,
	offsetRem: number = 0,
): void {
	const container = document.getElementById(containerId)
	const targetElement = document.getElementById(elementId)

	if (!container) {
		console.warn(\`Container with ID '\${containerId}' not found.\`)
		return
	}
	if (!targetElement) {
		console.warn(\`Element with ID '\${elementId}' not found.\`)
		return
	}

	const offsetPx =
		offsetRem * parseFloat(getComputedStyle(document.documentElement).fontSize)

	const containerRect = container.getBoundingClientRect()
	const targetRect = targetElement.getBoundingClientRect()

	const targetPosition = targetRect.top - containerRect.top + container.scrollTop - offsetPx

	gsap.to(container, {
		duration: duration,
		scrollTo: { y: targetPosition, autoKill: true },
		ease: 'power2.out',
	})
}
`