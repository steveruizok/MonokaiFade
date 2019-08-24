import React from 'react'
import { text } from './components/text'
import { MonokaiFade } from './components/MonokaiFade'

// Settings
const FONTSIZE = 24
const COLOR = '#333333'
const FADE_ROWS = 6
const SKEW = -3
const SPEED = 10
const STRANGE_OFFSET = 7 // huh?

const App: React.FC = () => {
	const rContainer = React.useRef<HTMLDivElement>(null)

	const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0 })

	// Update width and margins when window resizes
	const updateLayout = () => {
		if (!rContainer.current) return
		const { offsetWidth } = rContainer.current
		const { innerHeight } = window

		setLayout({
			x: offsetWidth % (FONTSIZE / 2),
			y: innerHeight % FONTSIZE,
			width: offsetWidth,
		})
	}

	// Set resize event listeners
	React.useEffect(() => {
		window.addEventListener('resize', updateLayout)
		updateLayout()
		return () => {
			window.removeEventListener('resize', updateLayout)
		}
	}, [])

	return (
		<div
			style={{
				position: 'relative',
				margin: 0,
			}}
		>
			<div
				ref={rContainer}
				style={{
					position: 'relative',
					width: 'auto',
					maxWidth: 490,
					fontFamily: 'Px437_IBM_VGA8',
					fontSize: FONTSIZE,
					lineHeight: 1,
					color: '#fff',
					margin: '0 auto',
					paddingTop: FONTSIZE * 16,
					transform: `skewY(${SKEW}deg)`,
				}}
			>
				{text}
			</div>
			<MonokaiFade
				// top
				width={layout.width}
				height={FONTSIZE * FADE_ROWS}
				fontSize={FONTSIZE}
				color={COLOR}
				speed={SPEED}
				skew={SKEW}
				style={{
					position: 'fixed',
					top: -STRANGE_OFFSET,
					left: 0,
				}}
			/>
			<MonokaiFade
				// bottom
				width={layout.width}
				height={FONTSIZE * FADE_ROWS}
				fontSize={FONTSIZE}
				color={COLOR}
				reverse={true}
				speed={SPEED}
				skew={SKEW}
				style={{
					position: 'fixed',
					left: -1,
					bottom: -FONTSIZE * 2 + (layout.y + STRANGE_OFFSET),
				}}
			/>
		</div>
	)
}

export default App
