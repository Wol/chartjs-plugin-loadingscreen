'use strict';

import Chart from 'chart.js';
import defaults from './defaults';

var helpers = Chart.helpers;

Chart.defaults.global.plugins.loadingscreen = defaults;

function drawLoadingScreen(chart, easing, options) {

	var resolve = helpers.options.resolve;
	var ctx = chart.ctx;

	if (!options) {
		return;
	}

	var targetOpacity = (options.visible ? 1 : 0);

	options.currentOpacity = resolve([options.currentOpacity, options.visible ? 1 : 0]);

	if (options.currentOpacity !== targetOpacity || options.currentOpacity > 0) {

		ctx.save();

		ctx.fillStyle = resolve([options.background.color, '#44444480']);
		ctx.strokeStyle = 'transparent';


		if (targetOpacity === 1 && options.currentOpacity === 1) { // still in
			options.currentOpacity = 1;
		} else if (targetOpacity === 1) { // fading up
			options.currentOpacity = easing;
		} else { // fading out
			options.currentOpacity = 1 - easing;
		}

		ctx.globalAlpha = options.currentOpacity;

		var chartArea = chart.chartArea;
		var size = {height: chartArea.bottom - chartArea.top,
			width: chartArea.right - chartArea.left};

		var circularCharts = ['radar', 'pie', 'doughnut', 'polarArea'];
		if (circularCharts.includes(chart.config.type) && options.background.shape !== 'rectangle') {
			var radius = (size.width) / 2;
			helpers.canvas.drawPoint(ctx, null, radius,
				chartArea.left + (size.width) / 2,
				chartArea.top + (size.height) / 2,
				null);
		} else {
			ctx.fillRect(chartArea.left, chartArea.top, size.width, size.height);
		}

		var progresstext = resolve([options.text.content], {easing: easing}, 0);

		if (progresstext) {

			ctx.fillStyle = 'black';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			ctx.fillText(progresstext,
				chartArea.left + (size.width) / 2,
				chartArea.top + (size.height) / 2);
		}

		ctx.restore();

	}
}

Chart.plugins.register({
	id: 'loadingscreen',
	afterDraw: function(chart, easing, options) {
		drawLoadingScreen(chart, easing, options);
	},


});
