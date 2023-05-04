let note_title = ""
let note_text = ""
let note_id = undefined

function opennote (id) {
  note_title = ""
  note_text = ""
  note_id = undefined
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
    for (note of notes) {
      if (note.id == id) {
        let content = JSON.parse(note.contents)
        note_id = note.id
        let title
        if (content.title) {
          title = content.title
        } else {
          title = ""
        }
        note_title = title
        note_text = content.text
        $("#notetext").val(note_text)
        $("#notetitle").val(note_title)
        break
      }
    }
    $("#notes").hide()
    $("#note").show()
    return
  })
}

function changenote(cb) {
  let p = new Promise((resolve, reject) => {
    if (note_id == undefined) {
      // createnote()
      $.post(
         apiurl+"/api/add_note",
         {
             contents: JSON.stringify({title: "", text: ""})
         },
         function (response) {
             note_id = response.id
             console.log(`note created! id: ${note_id}`)
             resolve()
         }
       );
    }
    else {
      resolve()
    }
  }).then(()=>{
    $.post(
      apiurl+"/api/edit_note",
      {
        contents: JSON.stringify({title: note_title, text: note_text}),
        id: note_id
      },
      function (response) {
        console.log(`note saved!`)
        if (cb) {
          cb()
        }
      }
    );
  })
}

$("#notetitle").on("change", function () {
  console.log("Hi there!");
  note_title = $(this).val()
  note_text = $("#notetext").val()
  changenote()
})
$("#notetext").on("change", function () {
  console.log("HI there")
  note_title = $("#notetitle").val()
  note_text = $(this).val()
  changenote()
})
$("#backnotes").on("click", function () {
  console.log("Hi there!");
  note_title = $("#notetitle").val()
  note_text = $("#notetext").val()
  if ($("#notetitle").val() != "" || $("#notetext").val() != "") {
    let p = new Promise((resolve, reject) => {
      changenote(resolve)
    }).then(()=>{
      $("#notetitle").val("")
      $("#notetext").val("")
      note_title = ""
      note_text = ""
      note_id = undefined
      notes()
    })
  }
})
