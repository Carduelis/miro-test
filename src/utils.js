export const createEl = (tagNameAndClass, attributes = {}) => {
	const [tagName, ...classes] = tagNameAndClass.split('.');
	const $el = document.createElement(tagName);
	classes.forEach(className => $el.classList.add(className));
	Object.entries(attributes).forEach(entry => $el.setAttribute(...entry));
	return $el;
};

const pathPonyfill = node => {
	const path = [];

	while (node) {
		path.push(node);

		if (node.tagName === 'HTML') {
			path.push(document);
			path.push(window);

			return path;
		}

		node = node.parentElement;
	}
};

export const getPath = event =>
	event.path ||
	(event.composedPath && event.composedPath()) ||
	pathPonyfill(event.target);
