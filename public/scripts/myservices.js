
console.log("myservices.js is working");

$(document).ready(function() {
    console.log("document.ready is working");
   $('[data-toggle="popover"]').popover();
   $('.popover-dismiss').popover({
      trigger: 'focus'
   });

// ADDING SERVICE TO USER RECORDS IN DATABASE
  $('form').on('submit', function (e){
    console.log("button clicked!!");
      e.preventDefault();
      var input = $(this);
      var formData = input.serialize();
      $.ajax({
          method: 'POST',
          url: '/myservices',
          data: formData,
          success: addServiceSuccess,
          error: addServiceError
      }).then(function(){
        console.log("hit the then promise!");
      });
  });

  function addServiceSuccess() {
    req.flash('success', 'Record added!');
  }

  function addServiceError() {
    req.flash('error', 'Try again!')
  }
  
$("#button1").click(function(){
        $("#physicalDiv").toggle();
    });
  });