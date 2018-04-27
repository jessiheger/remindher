
console.log("history.js is working");

$(document).ready(function() {

	$('.trashcan').click(function (e){
	    e.preventDefault();
	    // console.log($(this).attr('data-id'));
	    $.ajax({
	        method: 'DELETE',
	        url: '/history/'+$(this).attr('data-id'),
	        success: deleteServiceSuccess,
	        error: deleteServiceError
	    }).then(()=>{
	    	// console.log(this);
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


