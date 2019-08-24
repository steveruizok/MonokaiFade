// helpers

export const range = (length: number) =>
	Array.from(Array(length)).map((_, i) => i)

export const range2d = (
	rows: number,
	cols: number,
	callback: (row: number, col: number) => any
) => {
	return range(rows).map((r) => range(cols).map((c) => callback(r, c)))
}

export const toStep = (value: number, step: number) =>
	Math.round(value / step) * step

export const rand = (min: number, max: number) =>
	min + Math.random() * (max - min)
