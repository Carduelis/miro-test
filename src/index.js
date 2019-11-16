import './styles.less';
import { createEl, getPath } from './utils';
import EmailsList from './EmailsList';
import InputElement from './InputElement';
import Email from './Email';

class EmailEditor {
	defaultOptions = {
		fontSize: '14px', // actually it's totally not required
		placeholder: 'add more people...',
		emailsList: [],
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

	getLocalPath(path) {
		// we can rely on tagNames or classes when search by localpath
		const wrapperPathIndex = path.findIndex(node => node === this.$wrapper);
		return path.slice(0, wrapperPathIndex);
	}

	getEmailFromPath(path) {
		return path.find(node => node.emailInstance instanceof Email);
	}

	handleClick = event => {
		const path = getPath(event);
		const $emailNode = this.getEmailFromPath(path);
		const localPath = this.getLocalPath(path);
		if ($emailNode && localPath.find(node => node.tagName === 'BUTTON')) {
			this.emailsList.remove($emailNode.emailInstance);
		}
		if (!$emailNode) {
			this.input.$el.focus();
		}
	};

	init() {
		this.$wrapper = createEl('div.emailLoader_wrapper');
		const { $wrapper } = this;
		this.input = new InputElement(this.options.placeholder);
		const $input = this.input.$el;
		$wrapper.appendChild($input);
		if (this.options.fontSize) {
			$wrapper.style.fontSize = this.options.fontSize;
		}
		$wrapper.addEventListener('click', this.handleClick);

		this.$root.appendChild($wrapper);

		this.emailsList = new EmailsList({ $wrapper, $input });
		this.input.on('createEmail', this.emailsList.add);

		// bubble events
		this.on = this.emailsList.on.bind(this.emailsList);
		this.off = this.emailsList.off.bind(this.emailsList);
	}

	setEmailsList(list) {
		this.emailsList.setEmailsList(list);
		return this.emailsList.map.size;
	}

	add(payload) {
		return this.emailsList.add(payload);
	}

	getEmailsList() {
		return this.emailsList.emailsList;
	}

	clearEmailsList() {
		return this.emailsList.clear();
	}

	destroy() {
		this.$wrapper.removeEventListener('click', this.focusInput);
		this.emailsList.destroy();
		this.input.destroy();
		this.$root.removeChild(this.$wrapper);
	}
}

window.EmailEditor = EmailEditor;
export default EmailEditor;
