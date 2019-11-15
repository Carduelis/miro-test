import { createEl } from './utils';
import Email from './Email';
import Eventer from './Eventer';

const EVENT_NAMES = ['add', 'remove', 'clear'];

const byType = value => typeof value === 'string';
const byEmptiness = value => value.trim().length !== 0;
const byExistance = map => value => !map.has(value);

export default class EmailsStorage extends Eventer {
	emails = new Map();

	constructor({ $wrapper, $input }) {
		super(EVENT_NAMES);
		this.$wrapper = $wrapper;
		this.$input = $input;
	}

	insert(node) {
		this.$wrapper.insertBefore(node, this.$input);
	}

	clear() {
		this.emails.forEach(email => {
			email.trigger('remove');
		});
		this.emails.clear();

		this.trigger('clear');
	}

	add(payload) {
		const values = Array.isArray(payload) ? payload : [payload];

		const fragment = document.createDocumentFragment();

		// we can combine filters for better performance or use Prepack for such cases
		const newEmails = values
			.filter(byType)
			.filter(byEmptiness)
			.filter(byExistance(this.emails));

		newEmails.forEach(value => {
			if (!this.emails.has(value)) {
				const email = new Email(value);
				email.on('remove', this.remove);
				this.emails.set(value, email);
				fragment.appendChild(email.$el);
			}
		});

		this.insert(fragment);
		this.trigger('add', newEmails);
	}

	remove(email) {
		this.emails.delete(email);
		email.destroy();
		this.$wrapper.removeChild(this.$el);
		this.trigger('remove');
	}

	get emailsList() {
		return Array.from(this.emails.keys());
	}

	setEmailsList(list) {
		if (this.emails.size !== 0) {
			this.clear();
		}
		this.add(list);
	}

	destroy() {
		this.clear();
	}
}
