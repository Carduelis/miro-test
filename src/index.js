import './styles.less';
import { createEl } from './utils';
import EmailsStorage from './EmailsStorage';

class EmailEditor {
	defaultOptions = {
		rootFontSize: '14px',
		emailsList: [
			'javepy@gmail.com',
			'pavepy@gmail.com',
			'pavepy@gmail.com',
			'asdasd@asdas.eu',
		],
	};

	emails = new Map();

	constructor(element, userOptions = {}) {
		if (typeof window === 'undefined') {
			throw new TypeError(
				'The plugin is only intended to work in browser main thread'
			);
		}
		this.userOptions = userOptions;
		this.element = element;
		if (!(element instanceof HTMLElement)) {
			throw new TypeError(`HTMLElement expected, ${element} given`);
		}
		this.initDOM();
		this.setEmailsList(this.options.emailsList);
	}

	get options() {
		return { ...this.defaultOptions, ...this.userOptions };
	}

	appendEmails() {}

	initDOM() {
		this.$wrapper = createEl('div.wrapper');
		this.$input = createEl('input', {
			type: 'text',
			placeholder: 'add more people...',
		});
		const { $input, $wrapper } = this;
		$input.addEventListener('input', this.handleInput);
		$input.addEventListener('keypress', this.handleKeypress);
		$input.addEventListener('blur', this.handleBlur);
		const fragment = document.createDocumentFragment();
		this.emails.forEach(email => {
			fragment.appendChild(email.$el);
		});
		$wrapper.appendChild(fragment);
		$wrapper.appendChild($input);
		this.element.appendChild($wrapper);
		this.emailsStorage = new EmailsStorage({
			$wrapper,
			$input,
		});
	}

	handleInput = event => {
		console.log(event.target.value);
		const values = event.target.value.split(',');
		if (values.length > 1) {
			this.readFromInput(values);
		}
		if (event.target.value) {
			// do nothing
			console.log(event);
		}
	};

	handleKeypress = event => {
		if (event.key === 'Enter') {
			this.readFromInput(this.$input.value);
		}
	};

	readFromInput = payload => {
		this.emailsStorage.add(payload);
		this.$input.value = '';
		this.$input.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	handleBlur = event => {
		this.readFromInput(this.$input.value);
	};

	setEmailsList(list) {
		this.emailsStorage.setEmailsList(list);
		if (list.length !== this.emailsStorage.emails.size) {
			console.log(
				`${list.length -
					this.emailsStorage.emails.size} email duplicate(s) detected`
			);
		}
		return this.emailsStorage.emails.size;
	}

	getEmailsList() {
		return Array.from(this.emails)
			.filter(email => email.isValid)
			.map(email => email.value);
	}
}

window.EmailEditor = EmailEditor;
export default EmailEditor;
