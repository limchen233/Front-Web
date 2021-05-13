interface Cat {
	name: string
	run(): void
}
interface Fish {
	name: string
	swim(): void
}

// 将animal断言为fish，解决demo1中的编译错误
function isFish(animal: Cat | Fish) {
	if (typeof (animal as Fish).swim === 'function') {
		return true
	}
	return false
}
