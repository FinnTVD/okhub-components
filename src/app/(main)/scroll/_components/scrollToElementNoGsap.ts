'use client';
/**
 * Scrolls smoothly to a section inside a scrollable parent element using native scrollTo.
 * @param containerId - The ID of the scrollable container.
 * @param elementId - The ID of the element to scroll to.
 * @param duration - Optional duration of the scroll animation in seconds (default: 1s).
 * @param offsetRem - Optional offset from the top in rem (default: 0rem).
 */

export default function scrollToElementNoGsap(
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

	// Tính toán vị trí scroll đến (tương đối với container)
	const containerRect = container.getBoundingClientRect()
	const targetRect = targetElement.getBoundingClientRect()
	const targetPosition = targetRect.top - containerRect.top + container.scrollTop - offsetPx

	// Smooth scroll trong container với custom duration
	const startPosition = container.scrollTop
	const distance = targetPosition - startPosition
	const startTime = performance.now()

	function animateScroll(currentTime: number) {
		const elapsed = (currentTime - startTime) / 1000
		const progress = Math.min(elapsed / duration, 1)

		// Easing function (ease-out)
		const easeOut = 1 - Math.pow(1 - progress, 3)

		if (container) {
			container.scrollTop = startPosition + distance * easeOut
		}

		if (progress < 1) {
			requestAnimationFrame(animateScroll)
		}
	}

	requestAnimationFrame(animateScroll)
}

export const scrollToElementNoGsapCode = `
'use client';
/**
 * Scrolls smoothly to a section inside a scrollable parent element using native scrollTo.
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

	const startPosition = container.scrollTop
	const distance = targetPosition - startPosition
	const startTime = performance.now()

	function animateScroll(currentTime: number) {
		const elapsed = (currentTime - startTime) / 1000
		const progress = Math.min(elapsed / duration, 1)

		const easeOut = 1 - Math.pow(1 - progress, 3)

		if (container) {
			container.scrollTop = startPosition + distance * easeOut
		}

		if (progress < 1) {
			requestAnimationFrame(animateScroll)
		}
	}

	requestAnimationFrame(animateScroll)
}
`