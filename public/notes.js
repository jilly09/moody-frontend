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

function notes() {
  let notes = []
  let p = new Promise((resolve, reject)=>{
    $.get(apiurl+"/api/get_notes",{},
      function (response) {
        if (response.status == "ok") {
          notes = response.data
          resolve()
        }
      }
    )
  }).then((resolve, reject) => {
    notes = notes.sort((a, b) => b.lasttimestamp - a.lasttimestamp);
    $("#note-list").html("")
    for (note of notes) {
      let content = JSON.parse(note.contents)
      if (content.title) {
        title = cleanstr(content.title)
      } else {
        title = "Без заголовка"
      }
      $("#note-list").append(`<div onclick="opennote(${note.id})" class="note-item"><h1>${title}</h1>
      <p>${cleanstr(content.text.substring(0, 50))}...</p>
      <p class="small">Создано: ${cleanstr(new Date(note.timestamp).toLocaleString())}<br>Изменено: ${cleanstr(new Date(note.lasttimestamp).toLocaleString())}</p></div><hr>`)
    }
  })
}
