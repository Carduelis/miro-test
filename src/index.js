import './styles.less';

const RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const createEl = (tagNameAndClass, attributes = {}) => {
	const [tagName, ...classes] = tagNameAndClass.split('.');
	const $el = document.createElement(tagName);
	classes.forEach(className => $el.classList.add(className));
	Object.entries(attributes).forEach(entry => $el.setAttribute(...entry));
	return $el;
};

class Email {
	constructor(email) {
		this.value = email;
		this.$el = this.initElement();
	}

	initElement() {
		const $tag = createEl('span.tag');
		const $button = createEl('button');
		const $email = createEl('span.email');
		const $text = document.createTextNode(this.value);
		$email.appendChild($text);
		$tag.appendChild($email);
		$tag.appendChild($button);
		return $tag;
	}

	get isValid() {
		return RegExp.test(this.value);
	}
}

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
		this.setEmailsList(this.options.emailsList);
		this.initDOM();
	}

	get options() {
		return { ...this.defaultOptions, ...this.userOptions };
	}

	initDOM() {
		const $wrapper = createEl('div.wrapper');
		const $input = createEl('input', {
			type: 'text',
			placeholder: 'add more people...',
		});
		const fragment = document.createDocumentFragment();
		this.emails.forEach(email => {
			fragment.appendChild(email.$el);
		});
		$wrapper.appendChild(fragment);
		$wrapper.appendChild($input);
		this.element.appendChild($wrapper);
	}

	setEmailsList(list) {
		this.emails = new Map();
		list.forEach(email => {
			this.emails.set(email, new Email(email));
		});
		if (list.length !== this.emails.size) {
			console.log(
				`${list.length - this.emails.size} email duplicate(s) detected`
			);
		}
		return this.emails.size;
	}

	getEmailsList() {
		return Array.from(this.emails)
			.filter(email => email.isValid)
			.map(email => email.value);
	}
}

window.EmailEditor = EmailEditor;
export default EmailEditor;
