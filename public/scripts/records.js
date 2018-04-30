
console.log("records.js is working");

$(document).ready(function() {

	$('.trashcan').click(function (e){
	    e.preventDefault();
	    $.ajax({
	        method: 'DELETE',
	        url: '/records/'+$(this).attr('data-id'),
	        success: deleteServiceSuccess,
	        error: deleteServiceError
	    }).then(()=>{
	    	$(this).parent().remove();
	    });
	});

	function deleteServiceSuccess() {
	    console.log("deleted service successfully!", $(this).attr('data-id'));
	}

	function deleteServiceError() {
	    console.log("delete Service Error");
	}
});


