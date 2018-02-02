function addNote(){
  var title = document.getElementById("add-title").value;
  var text = document.getElementById("add-body").value;
  var params = "text="+text+"&title="+title;

  $.post(baseUrl+"notes",params,function(data){
    document.getElementById("notes").innerHTML = "<tr><td id='id1'>"+data._id+"</td><td id='title1'></td><td id='body1'></td><td><button onclick='displayNote()'>Get Note</button></td><td><button onclick='editNote()'>Edit</button></td><td><button onclick='deleteNote()'>Delete</button></td></tr>";
    document.getElementById("add-title").value = "";
    document.getElementById("add-body").value = "";
  });

}

function displayNote(){
  var id = document.getElementById ( "id1" ).innerText;
  $.get(baseUrl+"notes/"+id,function(data){
    document.getElementById("title1").innerHTML = data.title;
    document.getElementById("body1").innerHTML =  data.text;
  });

}
