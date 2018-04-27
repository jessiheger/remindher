
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
      }).then(function(data){
      });
  });

  function addServiceSuccess() {
      console.log("added service successfully!");
  }

  function addServiceError() {
      console.log("newServiceError");
  }
  
$("#button1").click(function(){
  console.log("button clicked!!!");
        $("#physicalDiv").toggle();
    });


  });



// $('#exampleModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })