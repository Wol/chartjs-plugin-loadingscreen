/**
 * @module Options
 */

'use strict';

export default {
	/**
	 * The background options used for the loading screen
	 * @member {Object|Array|Function}
	 * @prop {String} background.color - defaults to Grey
	 * @prop {String} text.content - The text to display over the top of the loader if required
	 */
	background: {
		color: undefined,
	},
	text: {
		content: 'Loading...',
		style: 'normal 16px sans-serif',
	},
	currentOpacity: undefined,
	visible: false,
};
