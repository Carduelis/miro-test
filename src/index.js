import './styles.less';
import { createEl } from './utils';
import EmailsStorage from './EmailsStorage';
import InputElement from './InputElement';

class EmailEditor {
	defaultOptions = {
		rootFontSize: '14px',
		placeholder: 'add more people...',
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
		this.init();
		this.setEmailsList(this.options.emailsList);
	}

	get options() {
		return { ...this.defaultOptions, ...this.userOptions };
	}

	appendEmails() {}

	init() {
		this.$wrapper = createEl('div.wrapper');
		const { $wrapper } = this;
		const inputInstance = new InputElement(
			this.options.placeholder,
			this.onAdd
		);
		const $input = inputInstance.$el;

		this.$wrapper.appendChild($input);
		this.element.appendChild($wrapper);

		this.emailsStorage = new EmailsStorage({
			$wrapper,
			$input,
		});
	}

	onAdd = payload => this.emailsStorage.add(payload);

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
		return this.emailsStorage.emailsList;
	}
}

window.EmailEditor = EmailEditor;
export default EmailEditor;
