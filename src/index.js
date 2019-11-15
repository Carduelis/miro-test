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

	constructor(element, userOptions = {}) {
		if (typeof window === 'undefined') {
			throw new TypeError(
				'The plugin is only intended to work in browser main thread',
			);
		}
		this.userOptions = userOptions;
		this.$root = element;
		if (!(element instanceof HTMLElement)) {
			throw new TypeError(`HTMLElement expected, ${element} given`);
		}
		if (typeof userOptions !== 'object' || Array.isArray(userOptions)) {
			throw new TypeError('Expected an object as the second argument');
		}
		this.init();
		this.setEmailsList(this.options.emailsList);
	}

	get options() {
		return { ...this.defaultOptions, ...this.userOptions };
	}

	init() {
		this.$wrapper = createEl('div.wrapper');
		const { $wrapper } = this;
		this.input = new InputElement(this.options.placeholder);
		const $input = this.input.$el;

		this.$wrapper.appendChild($input);
		this.$root.appendChild($wrapper);

		this.emailsStorage = new EmailsStorage({
			$wrapper,
			$input,
		});

		this.input.on('add', this.emailsStorage.add);
	}

	setEmailsList(list) {
		this.emailsStorage.setEmailsList(list);
		if (list.length !== this.emailsStorage.emails.size) {
			console.log(
				`${list.length -
					this.emailsStorage.emails
						.size} email duplicate(s) detected`,
			);
		}
		return this.emailsStorage.emails.size;
	}

	getEmailsList() {
		return this.emailsStorage.emailsList;
	}

	destroy() {
		this.input.destroy();
	}
}

window.EmailEditor = EmailEditor;
export default EmailEditor;
