interface Cat {
	name: string
	run(): void
}
interface Fish {
	name: string
	swim(): void
}

function swim(animal: Cat | Fish) {
	;(animal as Fish).swim()
}

const tom: Cat = {
	name: 'Tom',
	run() {
		console.log('run')
	}
}
swim(tom) // 报错，animal.swim is not a function，原因：将 animal 直接断言为 Fish 了，我们传的是Cat
