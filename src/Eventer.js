const eventNames = Symbol('privateEventNames');
const callbacks = Symbol('privateCallbacks');
const init = Symbol('privateInit');

export default class Eventer {
	constructor(arr) {
		this[eventNames] = arr;
		this[init]();
	}

	get availableEvents() {
		return `"${this[eventNames].join('", "')}"`;
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
			`"${key}"-event is not supported. Available: ${this.availableEvents}`,
		);
	}

	off(key, cb) {
		if (key in this[callbacks]) {
			return this[callbacks][key].delete(cb);
		}
		throw new Error(
			`"${key}"-event is not supported. Available: ${this.availableEvents}`,
		);
	}

	trigger(key, ...rest) {
		if (key in this[callbacks]) {
			return this[callbacks][key].forEach(cb => cb(...rest));
		}
		throw new Error(
			`"${key}"-event is not supported. Available: ${this.availableEvents}`,
		);
	}
}
