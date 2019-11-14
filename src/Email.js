import { createEl } from './utils';
const RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default class Email {
	constructor(email, emailsStorage) {
		this.value = email;
		this.$el = this.createElement();
		this.emailsStorage = emailsStorage;
	}

	handleClick = () => {
		this.emailsStorage.remove(this.value);
	};

	createElement() {
		const $tag = createEl('span.tag');
		this.$button = createEl('button');
		const $email = createEl('span.email');
		const $text = document.createTextNode(this.value);
		const $buttonText = document.createTextNode('✕');
		this.$button.appendChild($buttonText);
		this.$button.addEventListener('click', this.handleClick);
		$email.appendChild($text);
		$tag.appendChild($email);
		$tag.appendChild(this.$button);
		return $tag;
	}

	destroy() {
		this.$button.removeEventListener('click', this.handleClick);
		this.emailsStorage.$wrapper.removeChild(this.$el);
	}

	get isValid() {
		return RegExp.test(this.value);
	}
}
