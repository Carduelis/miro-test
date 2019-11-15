const eventNames = Symbol('eventNames');
const callbacks = Symbol('callbacks');
const init = Symbol('init');

export default class Eventer {
	constructor(arr) {
		this[eventNames] = arr;
		this[init]();
	}

	[init]() {
		this[callbacks] = this[eventNames].reduce((acc, eventName) => {
			acc[eventName] = new Set();
			return acc;
		}, {});
	}

	on(key, cb) {
		if (key in this[callbacks]) {
			return this[callbacks][key].add(cb);
		}
		throw new Error(
			`${key} event is not supported. Available: ${this[eventNames]}`,
		);
	}

	off(key, cb) {
		if (key in this[callbacks]) {
			return this[callbacks][key].delete(cb);
		}
		throw new Error(
			`${key} event is not supported. Available: ${this[eventNames]}`,
		);
	}

	trigger(key, ...rest) {
		this[callbacks][key].forEach(cb => cb(...rest));
	}
}
