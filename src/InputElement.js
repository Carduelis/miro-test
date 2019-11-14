import { createEl } from './utils';

export default class InputElement {
	constructor(placeholder, add) {
		this.$el = createEl('input', {
			type: 'text',
			placeholder,
		});
		this.add = add;
		this.init();
	}

	init() {
		this.$el.addEventListener('input', this.handleInput);
		this.$el.addEventListener('keypress', this.handleKeypress);
		this.$el.addEventListener('blur', this.handleBlur);
	}

	handleInput = event => {
		const values = event.target.value.split(',');
		if (values.length > 1) {
			this.readFromInput(values);
		}
	};

	handleKeypress = event => {
		if (event.key === 'Enter') {
			this.readFromInput(this.$el.value);
		}
	};

	handleBlur = () => {
		this.readFromInput(this.$el.value);
	};

	readFromInput = payload => {
		this.add(payload);
		this.$el.value = '';
		this.$el.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};
}
