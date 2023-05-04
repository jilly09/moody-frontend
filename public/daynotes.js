let emoji = ""
let private_data = ""
let shared_data = ""

$("#vsdn").on("click", function () {
  emoji="vs"
})
$("#sdn").on("click", function () {
  emoji = "s"
})
$("#ndn").on("click", function () {
  emoji = "n"
})
$("#gdn").on("click", function () {
  emoji = "g"
})
$("#hdn").on("click", function () {
  emoji = "h"
})
$("#publishdnbt").on("click", function () {
  $.post(
     apiurl+"/api/add_day_note",
     {
         private_data: $("#privatedn").val(),
         shared_data: $("#publicdn").val(),
         mood: emoji
     },
     function (response) {
         console.log(response);
         $("#add-day-note").hide()
         $("#feed").show()
         feed()
         $("#privatedn").hide()
         $("#publicdn").hide()
         emoji = ""
         private_data = ""
         shared_data = ""
     }
   );
})
