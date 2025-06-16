
// TODO @GMFields might need to update somethings in order to work as an API for other files

function setDownloadDefaults() {
  var url = location.search;
  var bucketArg = url.match(/bucket=[^&]*&/);
  if (bucketArg !== null) {
    document.getElementById("bucket").value = bucketArg.shift().slice(7, -1);
  }
  var fileArg = url.match(/fileName=[^&]*/);
  if (fileArg !== null) {
    document.getElementById("fileName").value = fileArg.shift().slice(9);
  }
}

function changeGetPath() {
  var bucket = document.forms["getFile"]["bucket"].value;
  var filename = document.forms["getFile"]["fileName"].value;
  if (bucket == null || bucket == "" || filename == null || filename == "") {
    alert("Both Bucket and FileName are required");
    return false;
  } else {
    document.submitGet.action = "/gcs/" + bucket + "/" + filename;
  }
}

function uploadFile() {
  var bucket = document.forms["putFile"]["bucket"].value;
  var file = document.forms["putFile"]["files"].files[0];
  var filename = file.name;

  if (bucket == null || bucket == "" || filename == null || filename == "") {
    alert("Both Bucket and FileName are required");
    return false;
  } else {
    document.forms["putFile"]["fileName"].value = filename;
    var request = new XMLHttpRequest();
    request.open("POST", "/gcs/" + bucket + "/" + filename, false);
    request.setRequestHeader("Content-Type", file.type);
    request.send(file);
  }
}