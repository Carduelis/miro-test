import { createEl } from './utils';
import Email from './Email';

const EVENT_NAMES = ['add', 'remove', 'clear'];

export default class EmailsStorage {
	emails = new Map();

	constructor({ $wrapper, $input }) {
		this.$wrapper = $wrapper;
		this.$input = $input;
	}

	insert(node) {
		this.$wrapper.insertBefore(node, this.$input);
	}

	callbacks = EVENT_NAMES.reduce((acc, eventName) => {
		acc[eventName] = new Set();
		return acc;
	}, {});

	on(key, cb) {
		if (key in this.callbacks) {
			this.callbacks[key].add(cb);
		}
		throw new Error(
			`${key} event is not supported. Availables ${EVENT_NAMES}`
		);
	}

	off(key, cb) {
		if (key in this.callbacks) {
			this.callbacks[key].delete(cb);
		}
		throw new Error(
			`${key} event is not supported. Availables ${EVENT_NAMES}`
		);
	}

	trigger(key, ...rest) {
		this.callbacks[key].forEach(cb => cb(...rest));
	}

	clear() {
		if (this.emails.size === 0) {
			return;
		}
		this.emails.forEach(email => {
			this.$wrapper.removeChild(email.$el);
		});
		this.emails.clear();

		this.trigger('clear');
	}

	add(payload) {
		const values = Array.isArray(payload) ? payload : [payload];

		const fragment = document.createDocumentFragment();
		const filterByType = value => typeof value === 'string';
		const filterByEmptiness = value => value.trim().length !== 0;

		values
			.filter(filterByType) // V8 can combine calls
			.filter(filterByEmptiness)
			.forEach(value => {
				if (!this.emails.has(value)) {
					const email = new Email(value, this);
					this.emails.set(value, email);
					this.trigger('add', email);
					fragment.appendChild(email.$el);
				}
			});

		this.insert(fragment);
	}

	remove(value) {
		if (!this.emails.has(value)) {
			return;
		}
		const email = this.emails.get(value);
		email.destroy();
		this.emails.delete(email);
		this.trigger('remove');
	}

	get emailsList() {
		return Array.from(this.emails.keys());
	}

	setEmailsList(list) {
		this.clear();
		this.add(list);
	}
}
