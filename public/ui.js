let parentwindow
$("#loginlink").on("click", function () {
  $("#registration").hide()
  $("#authentication").show()
})
$("#reglink").on("click", function () {
  $("#registration").show()
  $("#authentication").hide()
})
$(".menubt").on("click", function () {
  parentwindow = $(this).parent().parent().attr("id")
  $(`#${parentwindow}`).hide()
  $("#menu").show()
})
$("#feedbt").on("click", function () {
  $("#notes").hide()
  $("#menu").hide()
  $("#friends").hide()
  $("#feed").show()
})
$("#notesbt").on("click", function () {
  $("#feed").hide()
  $("#menu").hide()
  $("#friends").hide()
  $("#notes").show()
  notes()
})
$("#dnbt").on("click", function () {
  $("#feed").hide()
  $("#friends").hide()
  $("#menu").hide()
  $("#add-day-note").show()
})
$("#backbt").on("click", function () {
  $("#menu").hide()
  $(`#${parentwindow}`).show()
})
$("#notebt").on("click", function () {
  $("#notes").hide()
  $("#note").show()
})
$("#backnotes").on("click", function () {
  $("#note").hide()
  $("#notes").show()
})
$("#friendsbt").on("click", function () {
  $("#feed").hide()
  $("#menu").hide()
  $("#notes").hide()
  $("#friends").show()
})
