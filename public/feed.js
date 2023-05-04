apiurl=""
let friends;
let daynotes = []
function cleanstr(string) {
  var htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }

  return string.replace(/[&<>"']/g, function (match) {
    return htmlEscapes[match]
  })
}
function feed() {
  let p = new Promise((resolve, reject) => {
    $.get(
      apiurl+"/api/get_friends",
      {}, function (response) {
        if (response.status == "error") {
          $("#feed").hide()
          $("#authentication").show()
          return
        } else {
          let p = new Promise((resolve, reject) => {
            friends = response.data;
            for (friend in friends) {
              $.get(apiurl+`/api/get_day_notes_as_friend?nickname=${friend}`, {}, function(rresponse) {
                if (rresponse.status != "error") {
                  for (i of rresponse.data) {
                    i.nickname = friend
                    daynotes.push(i)
                  }
                }
              })
            }
            resolve()
          }).then(() => {
            let p = new Promise ((resolve, reject)=>{
              $.get(apiurl+"/api/get_day_notes", {}, function(rrresponse) {
                if (rrresponse.status != "error") {
                  resolve(rrresponse.data)
                }
              })

            }).then((data)=>{
              for (i of data) {
                daynotes.push(i)
              }
              daynotes = daynotes.sort((a, b) => b.timestamp - a.timestamp);
              console.log(daynotes)
              resolve()
            })
          })
        }
      }
    )
  }).then(() => {
    $("#post_list").html("")
    for (note of daynotes) {
      if (note.private_data) {
        $("#post_list").append(
          `<div class="daynote"> <div class="emoji">
            <img src="assets/${cleanstr(note.mood)}.png" alt="">
            </div><div><p>${cleanstr(note.private_data)}</p> <p>${cleanstr(note.shared_data)}</p> <p class="small">${new Date(note.timestamp).toLocaleString()}<br>Это твоя заметка</p></div></div><hr>`
        );
      } else {
        $("#post_list").append(
          `<div class="daynote"> <div class="emoji">
            <img src="assets/${cleanstr(note.mood)}.png" alt="">
            </div><div><p><b>${cleanstr(note.nickname)}</b></p><p>${cleanstr(note.shared_data)}</p> <p class="small">${new Date(note.timestamp).toLocaleString()}</p></div></div><hr>`
        );
      }
    }
  })
}
