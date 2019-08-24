import { rand } from './helpers'
import { interpolate } from '@popmotion/popcorn'

export const block = ({
	reverse = false,
	row = 0,
	col = 0,
	width = 16,
	height = 24,
	travel = 200,
	speed = 10,
	steps = 4,
}) => {
	// Starting position
	const [x, startY] = [col * width, row * height]

	// Min / Max
	const mid = rand(0.25, 0.75)
	const spread = Math.min(mid, 1 - mid)
	const [min, max] = [mid - spread / speed, mid + spread / speed]

	// Progress
	const getProgress = reverse
		? interpolate([0, travel], [0, 1])
		: interpolate([travel, 0], [0, 1])

	// Normal
	const getNormal = interpolate([min, max], [0, 1])

	// Steps
	const getSteps = (normal: number) => Math.floor(normal * steps)

	// Return a function to get this block's position / step
	return (scroll: number) => {
		const y = travel - ((startY + scroll) % travel)
		const progress = getProgress(y) as number
		const normal = getNormal(progress) as number
		const step = getSteps(normal)

		return [x, y, step]
	}
}
