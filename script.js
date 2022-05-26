/*
	WEB 303 Assignment 1 - jQuery
	{Mansimran Kaur}
*/
$(document).ready(function(){
	$("label").keyup(function(){
		const P = $("#price").val();
	const spanTax = (P * 13)/100;
	$("#tax").text("$" + spanTax.toFixed(2));
  });

});

document.getElementById('add-price').onclick = addItem;
function addItem() {

}

