$(document).ready(function(){
	$.get("/api/products", function(data) {
		console.log(data);
		for(var i=0;i<data.length;i++){
			$("#products").append("<tr><td>"+ data[i].product_name+"</td>"+
				"<td>"+ data[i].description +"</td>"+"<td><button class='mdl-button mdl-js-button mdl-button--raised mdl-button--colored orderBtn'"+
				" sku="+data[i].sku + " pname="+data[i].product_name +">"+"Order</button></td></tr>");
		}

	});

	function orderAlert(product){
		
		alert("Order has been placed for the item: "+ product);
	}

	function insertOrder(event) {
		event.preventDefault();
		var order = {
			station_completed: 0,
			shipped_flag: false,
			sku: $(this).attr("sku"),
		};
		$.post("/api/new-order", order, orderAlert($(this).attr("pname")));
		
	}
	$(document).on("click", ".orderBtn", insertOrder);

});

