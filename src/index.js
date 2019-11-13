import 'normalize.css';
import './styles.less';

class EmailEditor {
	defaultOptions = {
		rootFontSize: '14px',
	};

	emails = new Set();

	constructor(element, userOptions) {
		this.userOptions = userOptions;
		this.element = element;
		if (!(element instanceof HTMLElement)) {
			throw new TypeError(`HTMLElement expected, ${element} given`);
		}
	}

	get options() {
		return { ...this.defaultOptions, ...this.userOptions };
	}
}

export default EmailEditor;
