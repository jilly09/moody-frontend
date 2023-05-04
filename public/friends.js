function deletefriend(nickname) {
  let p = new Promise((resolve, reject) => {
    $.post(
      apiurl+"/api/delete_friend",
      {nickname: nickname},
      function (response) {
        console.log(response)
        if (response.status == "ok") {
          resolve()
        }
      }
    );
  }).then(()=>{
    showfriends()
  })
}

function deletereq(id) {
  let p = new Promise((resolve, reject) => {
    $.post(
      apiurl+"/api/delete_friendship_request",
      {id: id},
      function (response) {
        console.log(response)
        if (response.status == "ok") {
          resolve()
        }
      }
    );
  }).then(()=>{
    showfriends()
  })
}
function acceptreq(id) {
  let p = new Promise((resolve, reject) => {
    $.post(
      apiurl+"/api/accept_friendship_request",
      {id: id},
      function (response) {
        console.log(response)
        if (response.status == "ok") {
          resolve()
        }
      }
    );
  }).then(()=>{
    showfriends()
  })
}

function showfriends() {
  let statuses = []
  // /api/get_friends
  let p = new Promise((resolve, reject) => {
    $.get(
      apiurl+"/api/get_statuses_as_friend",
      {},
      function (response) {
        console.log(response)
        if (response.status == "ok") {
          statuses = response.data
          resolve()
        }
      }
    );
  }).then(()=>{
    $("#friends-list").html("")
    for (status in statuses) {
      let data = JSON.parse(status.data)
      if (data.emoji != "") {
        $("#friends-list").append(`<div class="daynote"><div class="emoji">
          <img src="assets/${cleanstr(data.emoji)}.png" alt="">
          </div> <p>${cleanstr(data.text)}</p> <p class="small">${cleanstr(status.timestamp)}</p> </div>`)
      } else {
        $("#friends-list").append(`<div class="daynote"><p>${cleanstr(data.text)}</p> <p class="small">${cleanstr(status.timestamp)}</p> <p onclick="deletefriend(${cleanstr("status.nickname")})"><u>Удалить из друзей</u></p></div>`)
      }
    }
    let p = new Promise((resolve, reject) => {
      $.get(
        apiurl+"/api/get_friendship_requests",
        {},
        function (response) {
          if (response.status == "ok") {
            for (i of response.data)
            $("#pending-requests").append(`<div><p>От: ${cleanstr(i.user)}<br>Кому: ${cleanstr(i.to_user)}</p>
              <button class="smallbt" onclick="deletereq(${cleanstr(i.id)})">Отклонить</button><button onclick="acceptreq(${cleanstr(i.id)})" class="smallbt">Принять</button</div>`)
          }
        }
      )
    })
  })
}
