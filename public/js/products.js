$(document).ready(function(){
	
	function orderAlert(product){
		$("#dialogcontent").html("<p>Product Name : "+product+"</p>");
		dialog.showModal();
		dialog.querySelector('.close').addEventListener('click', function() {
			dialog.close();
		});
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



	var dialog = document.querySelector('dialog');
	var showDialogButton = document.querySelector('#show-dialog');
	if (! dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}

	dialog.querySelector('.close').addEventListener('click', function() {
		dialog.close();
	});

});

