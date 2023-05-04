$("#sendfrbt").on("click", function (){
  if ($("#frnickname").val() != "") {
    $.post(
      apiurl+"/api/send_friendship_request",
      {
        nickname: $("#frnickname").val()
      },
      function (response) {
        console.log(response)
        if (response.status != "error") {
          alert("Запрос дружбы отправлен успешно")
        } else if (response.data == "person is already your friend") {
          alert("Этот пользователь уже есть в твоем списке друзей")
        } else if (response.data == "invalid nickname") {
          alert("Неверный никнейм")
        }
      }
    );
  }
})
