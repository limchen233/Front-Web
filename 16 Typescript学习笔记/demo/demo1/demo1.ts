interface Cat {
	name: string
	run(): void
}
interface Fish {
	name: string
	swim(): void
}

function isFish(animal: Cat | Fish) {
	if (typeof animal.swim === 'function') {
		return true
	}
	return false
}
