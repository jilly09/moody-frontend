apiurl=""

let bcrypt = dcodeIO.bcrypt;

function hashfunc(string) {
  let shaObj = new jsSHA("SHA3-512", "TEXT", {
      encoding: "UTF8",
  });
  shaObj.update(string);
  return shaObj.getHash("HEX");
}

$("#regbt").on("click", async function () {
  let bcsalt = bcrypt.genSaltSync();

  let l = (bcsalt+$("#regnickname").val()).length
  let padding = "P"*(1000-l)

  let hash = bcrypt.hashSync($("#regpassword").val()+padding, bcsalt);
  let keys = await generateKeys(hash)
  let password = hashfunc(hash)
  $.post(
       apiurl+"/api/reg",
       {
           nickname: $("#regnickname").val(),
           name: $("#regnickname").val(),
           password: password,
           salt: bcsalt,
           private_key: keys.privateKey,
           public_key: keys.publicKey
       },
       function (response) {
           console.log(response);
           if (response.status != "error") {
               console.log("ok")
           } else {
             if (response.data == "nickname already exists") {
               alert("Никнейм уже занят!")
             }
           }
       }
   );

})
