window1()
function window1 () {
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Tiempo real"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			}, 
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Tiempo real"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	function drawCharts(){			
		console.log("Getting Data")
		jQuery.getJSON("/Generar",function addData(data) {
			for (var i = data.length-1; i >= 0; i--) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),
				
					
				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),
				
					
				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),
				
					
				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),
				
					
				});	
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					}, 
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];
		
		
		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2) 
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4) 
			}  
			}
		}
			
		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		Carga = Carga + P4[i];  
		}  
			
		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);
			
		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);
			
		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);
			
		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"}); 
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;
		
		
		});
				
	}
	
	
	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;

	

	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
		
	drawCharts();
	setInterval(drawCharts,9000);
};
		
  


function window2 () {
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Día actual"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			}, 
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Día actual"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	function drawCharts(){			
		console.log("Getting Data")
		jQuery.getJSON("/GenerarDay",function addData(data) {
			for (var i = data.length-1; i >= 0; i--) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),
				
					
				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),
				
					
				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),
				
					
				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),
				
					
				});	
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					}, 
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];
		
		
		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2) 
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4) 
			}  
			}
		}
			
		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		Carga = Carga + P4[i];  
		}  
			
		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);
			
		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);
			
		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);
			
		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"}); 
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;
		
		
		});
				
	}
	
	
	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;

	

	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
		
	drawCharts();
};

function window3 () {
	console.log(Fechas)
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Día seleccionado"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			}, 
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			text: "Potencia actual: Nodo 611"
		},
		subtitles:[
		{
			text: "Día seleccionado"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	function drawCharts(){			
		console.log("Getting Data")
		jQuery.getJSON("/GenerarCal",String(Fechas),function addData(data) {
			for (var i = data.length-1; i >= 0; i--) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),
				
					
				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),
				
					
				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),
				
					
				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),
				
					
				});	
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					}, 
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];
		
		
		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2) 
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4) 
			}  
			}
		}
			
		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		Carga = Carga + P4[i];  
		}  
			
		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);
			
		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);
			
		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);
			
		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"}); 
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;
		
		
		});
				
	}
	
	
	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;

	

	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
		
	drawCharts();
};

function window4 () {
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			text: "Nodo 611"
		},
		subtitles:[
		{
			text: "Última semana"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			}, 
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			text: "Potencia actual: Nodo 611"
		},
		subtitles:[
		{
			text: "Última semana"
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			//fontSize: 30
		}
		],
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	function drawCharts(){			
		console.log("Getting Data")
		jQuery.getJSON("/GenerarWeek",function addData(data) {
			for (var i = data.length-1; i >= 0; i--) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),
				
					
				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),
				
					
				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),
				
					
				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),
				
					
				});	
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					}, 
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];
		
		
		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2) 
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4) 
			}  
			}
		}
			
		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		Carga = Carga + P4[i];  
		}  
			
		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);
			
		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);
			
		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);
			
		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"}); 
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;
		
		
		});
				
	}
	
	
	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;

	

	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
		
	drawCharts();
};
