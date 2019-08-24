import * as React from 'react'
import { range2d } from './helpers'
import { block } from './block'
const shades = [' ', '░', '▒', '▓', '█']

type Props = {
	width?: number
	height?: number
	reverse?: boolean
	fontSize?: number
	color?: string
	marginLeft?: number
	marginTop?: number
	speed?: number
	skew?: number
	style?: React.CSSProperties
}

export const MonokaiFade: React.FC<Props> = ({
	reverse = false,
	height = 240,
	width = 640,
	fontSize = 20,
	color = '#333333',
	speed = 10,
	skew = 0,
	style = {},
}) => {
	const canvas = React.useRef<HTMLCanvasElement>(null)

	// Create blocks
	const blocks = React.useMemo(() => {
		const [blockWidth, blockHeight] = [fontSize / 2, fontSize]

		const [cols, rows] = [
			Math.ceil(width / blockWidth),
			Math.ceil(height / blockHeight),
		]

		// Get a 2D array of blocks (as a regular array)
		return range2d(rows, cols, (row, col) =>
			block({
				row,
				col,
				width: blockWidth,
				height: blockHeight,
				travel: rows * blockHeight,
				steps: shades.length - 1,
				speed,
				reverse,
			})
		).flat()
	}, [height, width, reverse, speed, fontSize])

	// Re-paint the canvas using out blocks
	const drawBlocks = React.useCallback(() => {
		const cvs = canvas.current as HTMLCanvasElement
		const ctx = cvs.getContext('2d') as CanvasRenderingContext2D
		const { scrollY } = window

		// Clear canvas
		ctx.clearRect(0, 0, width, height)

		// Draw each block to the canvas
		for (let block of blocks) {
			const [x, y, step] = block(scrollY)
			ctx.fillText(shades[step], x, y)
		}
	}, [blocks, height, width])

	React.useLayoutEffect(() => {
		const cvs = canvas.current as HTMLCanvasElement
		const ctx = cvs.getContext('2d') as CanvasRenderingContext2D

		// Set canvas style
		ctx.fillStyle = color
		ctx.font = `${fontSize}px Px437_IBM_VGA8`

		// Draw initial blocks
		drawBlocks()

		// Set scroll listeners
		window.addEventListener('scroll', drawBlocks)
		return () => {
			window.removeEventListener('scroll', drawBlocks)
		}
	}, [fontSize, drawBlocks, color])

	return (
		<div
			style={{
				...style,
				display: 'flex',
				width: '100%',
				alignContent: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				imageRendering: 'pixelated',
				transform: `skewY(${skew}deg)`,
			}}
		>
			<canvas
				ref={canvas}
				height={height}
				width={width}
				style={{
					height,
					width,
					imageRendering: 'pixelated',
				}}
			/>
			<div
				style={{
					// Skew gap fixer
					backgroundColor: color,
					position: 'absolute',
					width: '100%',
					height: 100,
					top: reverse ? height - fontSize : -100 + 8,
				}}
			/>
		</div>
	)
}
