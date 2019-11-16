import { createEl } from './utils';
const RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default class Email {
	constructor(email) {
		this.value = email;
		this.$el = this.createElement();
		this.$el.emailInstance = this;
	}

	get isValid() {
		return RegExp.test(this.value.toLowerCase());
	}

	createElement() {
		const $tag = createEl('span.tag');
		this.$button = createEl('button', { type: 'button', title: 'Remove' });
		const $buttonInner = createEl('span');
		const $email = createEl('span.email');
		if (!this.isValid) {
			$tag.setAttribute('title', 'Invalid email');
			$tag.classList.add('invalid');
		}
		const $text = document.createTextNode(this.value);
		const $buttonText = document.createTextNode('✕');
		$buttonInner.appendChild($buttonText);
		this.$button.appendChild($buttonInner);
		$email.appendChild($text);
		$tag.appendChild($email);
		$tag.appendChild(this.$button);
		return $tag;
	}
}
