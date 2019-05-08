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


	var linearOpacity = function(opts) {
		var _targetOpacity = opts.targetOpacity;
		var _easing = opts.easing;

		return (_targetOpacity === 1) ? _easing : 1 - _easing;
	};

	var currentOpacity = resolve([options.currentOpacity, linearOpacity, options.visible ? 1 : 0], {
		easing: easing,
		targetOpacity: targetOpacity
	});


	if (currentOpacity > 0) {

		ctx.save();

		ctx.fillStyle = resolve([options.background.color, '#44444480'], {easing: easing, targetOpacity: targetOpacity});
		ctx.strokeStyle = 'transparent';


		ctx.globalAlpha = currentOpacity;

		var chartArea = chart.chartArea;
		var size = {
			height: chartArea.bottom - chartArea.top,
			width: chartArea.right - chartArea.left
		};

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

		var progresstext = resolve([options.text.content], {easing: easing, targetOpacity: targetOpacity});

		if (progresstext) {

			ctx.fillStyle = 'black';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			ctx.font = options.text.style;
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
