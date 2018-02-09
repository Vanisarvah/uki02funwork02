//using XMLHttpRequest

var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

function addNote(){
  var fname = document.getElementById("add-fname").value;
  var lname = document.getElementById("add-lname").value;
  var mail = document.getElementById("add-mail").value;
  var pass = document.getElementById("add-pass").value;

  var params = "fname="+fname+"&lname="+lname+"&mail="+mail+"&pass="+pass;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("notes").innerHTML = "<tr><td id='id1'>"+data._id+"</td><td id='fname1'></td><td id='lname1'></td><td id='mail1'></td><td id='pass1'></td><td><button onclick='displayNote()'>Get Note</button></td><td><button onclick='editNote()'>Edit</button></td><td><button onclick='deleteNote()'>Delete</button></td></tr>";
      document.getElementById("add-fname").value = "";
      document.getElementById("add-lname").value = "";
      document.getElementById("add-mail").value = "";
      document.getElementById("add-pass").value = "";
    }
  };
  xhttp.open("POST", baseUrl+"notes", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

function displayNote(){
  var id = document.getElementById ( "id1" ).innerText;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("fname1").innerHTML = data.fname;
      document.getElementById("lname1").innerHTML = data.lname;
      document.getElementById("mail1").innerHTML = data.mail;
      document.getElementById("pass1").innerHTML =  data.pass;
    }
  };
  xhttp.open("GET", baseUrl+"notes/"+id, true);
  xhttp.send();
}

function editNote(){
  document.getElementById("edit-fname").value = document.getElementById("fname1").innerHTML;
  document.getElementById("edit-lname").value = document.getElementById("lname1").innerHTML;
  document.getElementById("edit-mail").value = document.getElementById("mail1").innerHTML;
  document.getElementById("edit-pass").value = document.getElementById("pass1").innerHTML;
  document.getElementById('spoiler').style.display = 'block';
}

function saveEdit(){
  var editTitle = document.getElementById("edit-title").value;
  var editText = document.getElementById("edit-body").value;
  var id = document.getElementById ( "id1" ).innerText;

  var params = "text="+editText+"&title="+editTitle;

  console.log(params);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("title1").innerHTML = data.title;
      document.getElementById("body1").innerHTML =  data.text;
      document.getElementById('spoiler').style.display = 'none';
    }
  };
  xhttp.open("PUT", baseUrl+"notes/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);




}

function deleteNote(){
  //console.log("in del");
  var id = document.getElementById ( "id1" ).innerText;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("id1").innerHTML = "";
      document.getElementById("fname1").innerHTML = "";
      document.getElementById("lname1").innerHTML =  "";
      document.getElementById("mail1").innerHTML =  "";
      document.getElementById("pass1").innerHTML =  "";
    }
  };
  xhttp.open("DELETE", baseUrl+"notes/"+id, true);
  xhttp.send();
  //console.log("deleted");
}
