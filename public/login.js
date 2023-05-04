
$("#loginbt").on("click", function () {
  let bcsalt
  $.ajax({
    type: "GET",
    url: `${apiurl}/api/get_salt?nickname=${$("#loginnickname").val()}`,
    success: function (response) {
      if (response.status == "error") {
        alert("Некорректные данные")
      } else {
        bcsalt = response.data
        let l = (bcsalt+$("#loginnickname").val()).length
        let padding = "P"*(1000-l)

        let hash = bcrypt.hashSync($("#loginpassword").val()+padding, bcsalt);
        let password = hashfunc(hash)
        $.post(
          apiurl+"/api/auth",
          {
              nickname: $("#loginnickname").val(),
              password: password,
          },
          function (response) {
            console.log(response);
            if (response.status != "error") {
              $("#authentication").hide()
              $("#feed").show()
              console.log(document.cookie)
              feed()
              notes()
            } else {
              alert("Некорректные данные")
            }
          }
         );
      }
    },
  })

})
