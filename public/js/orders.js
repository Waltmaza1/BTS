$(document).ready(function(){
	function run(){
		$.get("/api/orders-ready", function(data) {
			console.log(data);
			$("#orders").html("<h4>Order shipped mail has been sent to "+ data[0].email +"</h4>");
		});
	}

	function qualityReport(sku1,sku2,sku3, title){
		Highcharts.chart('container2', {
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45,
					beta: 0
				}
			},
			title: {
				text: title
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Percentage of products that meet the quality guidelines',
				data: [
				['ABC123', sku1],
				['LMN123', sku2],
				{
					name: 'XYZ123',
					y: sku3,
					sliced: true,
					selected: true
				},
				
				]
			}]
		});

	}
	function ordersPerSkuReport(c1,c2,c3){
		Highcharts.chart('container2', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Number of orders per sku'
			},

			xAxis: {
				categories: [
				'ABC123',
				'LMN123',
				'XYZ123',
				],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number of orders'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'ABC123',
				data: [c1]

			}, {
				name: 'LMN123',
				data: [c2]

			}, {
				name: 'XYZ123',
				data: [c3]

			},]
		});
	}

	function ordersShipped(c1, c2, c3){
		Highcharts.chart('container2', {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Number of orders shipped per sku'
			},
			xAxis: {
				categories: ['ABC123', 'LMN123', 'XYZ123'],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number of orders shipped',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				}
			},

			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -40,
				y: 80,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFF'),
				shadow: true
			},
			credits: {
				enabled: false
			},
			series: [{
				data: [c1, c2, c3]
			}]
		});
	}
	function generateReport(reportUrl){
		$.get(reportUrl, function(data) {
			if(reportUrl == "/api/quality-report"){
				var total = 0;
				var skuarr = [];
				for(var i=0;i<data.length;i++){
					skuarr.push(data[i].count);
					total +=  data[i].count;
				}
				console.log(total);
				if(data.length == 3){
					let p_sku0 = (skuarr[0]/total)*100;
					let p_sku1 = (skuarr[1]/total)*100;
					let p_sku2 = (skuarr[2]/total)*100;
					let title = "Total number of products that passed the quality test: "+ total;
					qualityReport(p_sku0,p_sku1,p_sku2, title);
				}
			}
			else if(reportUrl == "/api/ordersShipped-report"){
				let c1, c2, c3;
				c1 = c2 = c3 = 0;
				console.log(data);
				for(var i=0;i<data.length;i++){
					if(data[i].sku == "ABC123"){
						c1 = data[i].count;
					}
					else if(data[i].sku == "LMN123"){
						c2 = data[i].count;
					}
					else if(data[i].sku == "XYZ123"){
						c3 = data[i].count;
					}
				}
				ordersShipped(c1, c2,c3);
			}
			else if(reportUrl == "/api/orderssku-report"){
				let c1, c2, c3;
				c1 = c2 = c3 = 0;
				for(var i=0;i<data.length;i++){
					if(data[i].sku == "ABC123"){
						c1 = data[i].count;
					}
					else if(data[i].sku == "LMN123"){
						c2 = data[i].count;
					}
					else if(data[i].sku == "XYZ123"){
						c3 = data[i].count;
					}
				}
				ordersPerSkuReport(c1,c2,c3);
			}
		});
	}
	$("#ordersReady").click(function(){
		run()});
	$("#genBtn").click(function(){
		$("#container2").html("");
		generateReport($("#reports").val());
	});
});