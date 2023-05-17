// TODO @GMFields might need to update somethings in order to work as an API for other files

const PATH = "https://helical-ascent-385614.oa.r.appspot.com/gcs/"

function downloadFile(filename) {
    if (filename == null || filename == "") {
      alert("FileName are required"); //TODO could be changed
      return false;
    } else {
      document.submitGet.action = PATH + "/" + filename;
    }
}

function uploadFile(file) {
    var filename = file.name;
    
    if (filename == null || filename == "") {
      alert("FileName are required"); //TODO could be changed
      return false;
    } else {
      var request = new XMLHttpRequest();
      request.open("POST", PATH + "/" + filename);
      request.setRequestHeader("Content-Type", file.type);
      request.send(file);
    }
}