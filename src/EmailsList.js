import Email from './Email';
import Eventer from './Eventer';

const EVENT_NAMES = ['add', 'remove'];

const byType = value => typeof value === 'string';
const byEmptiness = value => value.trim().length !== 0;
const byExistance = map => value => !map.has(value);

export default class EmailsList extends Eventer {
	map = new Map();

	constructor({ $wrapper, $input }) {
		super(EVENT_NAMES);
		this.$wrapper = $wrapper;
		this.$input = $input;
	}

	get emailsList() {
		return Array.from(this.map.values())
			.filter(email => email.isValid)
			.map(email => email.value);
	}

	setEmailsList(list) {
		if (this.map.size !== 0) {
			this.clear();
		}
		this.add(list);
	}

	add = payload => {
		const values = Array.isArray(payload) ? payload : [payload];

		const fragment = document.createDocumentFragment();

		// we can combine filters for better performance or use Prepack for such cases
		const newEmails = values
			.filter(byType)
			.filter(byEmptiness)
			.filter(byExistance(this.map));

		newEmails.forEach(value => {
			if (!this.map.has(value)) {
				const email = new Email(value);
				this.map.set(value, email);
				fragment.appendChild(email.$el);
			}
		});

		this.insertNode(fragment);
		if (newEmails.length > 0) {
			this.trigger('add', newEmails);
		}

		return newEmails.length;
	};

	remove = (email, options = { silent: false }) => {
		const isDeleted = this.map.delete(email.value);
		if (isDeleted) {
			this.$wrapper.removeChild(email.$el);
		}
		if (!options.silent) {
			this.trigger('remove', [email.value]);
		}
	};

	insertNode(node) {
		this.$wrapper.insertBefore(node, this.$input);
	}

	clear() {
		const emailsToClear = Array.from(this.map.keys());
		this.map.forEach(email => this.remove(email, { silent: true }));
		this.trigger('remove', emailsToClear);

		this.map.clear();
	}

	destroy() {
		this.clear();
	}
}
