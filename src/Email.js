import { createEl } from './utils';
import Eventer from './Eventer';
const RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const EMAIL_EVENTS = ['remove'];

export default class Email extends Eventer {
	constructor(email) {
		super(EMAIL_EVENTS);
		this.value = email;
		this.$el = this.createElement();
	}

	get isValid() {
		return RegExp.test(this.value);
	}

	handleCloseClick = () => {
		this.trigger('remove', this);
	};

	createElement() {
		const $tag = createEl('span.tag');
		this.$button = createEl('button');
		const $email = createEl('span.email');
		const $text = document.createTextNode(this.value);
		const $buttonText = document.createTextNode('✕');
		this.$button.appendChild($buttonText);
		this.$button.addEventListener('click', this.handleCloseClick);
		$email.appendChild($text);
		$tag.appendChild($email);
		$tag.appendChild(this.$button);
		return $tag;
	}

	destroy() {
		this.$button.removeEventListener('click', this.handleCloseClick);
	}
}
