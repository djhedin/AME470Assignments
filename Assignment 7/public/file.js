var fileUploaded = function()
{
   var file = $('#theFileUploader').get(0);
   var fileObj = $('#theFileUploader').get(0).files[0]
   var filename = fileObj.name;
   var ext = filename.split(".");
   ext = ext[ext.length-1];
   console.log(ext);

   var fd = new FormData();
   var fileInput = "s3Upload_" + new Date().getTime().toString() + "." + ext;
   fd.append('fileInput', fileInput);
   fd.append('input', file.files[0]);
   fd.append('date', (new Date()).toString());

    //fd.append('data', data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState != 4) { return; }
        // callback logic
       // document.getElementById("preview").src = "https://s3.amazonaws.com/ame470dhedin/" + fileInput;
       addImgSrcToBucket("https://s3.amazonaws.com/ame470dhedin/" + fileInput);
    };
    xhr.open("POST", "/uploadFile", true);
    xhr.send(fd);
}

function saveImageEdit(){
  if(sessionStorage.getItem("isEdited") == "true"){
     var fd = new FormData();
     var fileInput = document.getElementById("preview").src.split("ame470dhedin/")[1];
     fileInput = fileInput.split("?")[0];
     fd.append('fileInput', fileInput);
     fd.append('date', (new Date()).toString());
     fd.append('data', sessionStorage.getItem("editedImage"));

      //fd.append('data', data);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        cancelImageEdit();
        if (xhr.readyState != 4) { return; }
          // callback logic
        document.getElementById("preview").src = "https://s3.amazonaws.com/ame4702018/" + fileInput + "?t=" + new Date().getTime();
      };
      xhr.open("POST", "/uploadImage", true);
      xhr.send(fd);
  }

}

function cancelImageEdit()
{
  document.getElementById("DRFrame").src = "";
  document.getElementById("editWrapper").style.display = "none";
}

function editImage(){
  var url = document.getElementById("preview").src;
  document.getElementById("DRFrame").src = "./demo/index.html#" + url;
  document.getElementById("editWrapper").style.display = "block";
  sessionStorage.setItem("isEdited", "false");
}
