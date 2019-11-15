import { createEl } from './utils';
import Eventer from './Eventer';

const INPUT_EVENTS = ['add'];

export default class InputElement extends Eventer {
	constructor(placeholder, add) {
		super(INPUT_EVENTS);
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
		this.trigger('add', payload);
		this.$el.value = '';
		this.$el.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	destroy() {
		this.$el.removeEventListener('input', this.handleInput);
		this.$el.removeEventListener('keypress', this.handleKeypress);
		this.$el.removeEventListener('blur', this.handleBlur);
	}
}
