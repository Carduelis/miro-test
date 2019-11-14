export const createEl = (tagNameAndClass, attributes = {}) => {
	const [tagName, ...classes] = tagNameAndClass.split('.');
	const $el = document.createElement(tagName);
	classes.forEach(className => $el.classList.add(className));
	Object.entries(attributes).forEach(entry => $el.setAttribute(...entry));
	return $el;
};
