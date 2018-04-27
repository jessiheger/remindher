console.log("find.js is working");

//Change Zip Code (PUT REQUEST)
$('#changeZip').on('submit', function(e) {
  e.preventDefault();
  let newZip = $('#zipcode').val();
  let data = {location: newZip};
  // console.log("data is:", data);
  $.ajax({
    method: 'PUT',
    url: '/find',
    data: data
  }).done(function(data) {
  	$('#zipP').text(`Based on your current zipcode of ${newZip}`);
    // console.log(data);
    window.location = "/find"
	});
});





//re-assign user.location on back end