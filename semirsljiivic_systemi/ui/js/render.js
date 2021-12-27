var resourceName = '';

var connections = [];
var kills = [];
var vehicles = [];
var reports = [];
var weapons = [];
var chat = [];

var currentMenu = 1;
var strings = {};
let darkmode = false;

function renderConnections(search) {
  let container = $(".grid-container-join");
  container.html("");
  currentMenu = 1;


  for (var i = connections.length-1; i >= 0; i--) {
    let log = connections[i];
    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search)) {
      let html = '<div class="grid-item-join 4">'
      +'<p class="headc">'+log.name+'</p>'
      +'<hr style="color:black;margin:2px;">'      
      +'<p><i class="fas fa-plug"></i> '+log.info + '['+log.steamID+']'+'</p>'
      +'</div>';

      container.append(html);
    }
  }

  document.getElementById("grid-container-sve").style.display = "none";
  document.getElementById("grid-container-report").style.display = "none";
  document.getElementById("grid-container-ask").style.display = "none";
  document.getElementById("grid-container-death").style.display = "none";
  document.getElementById("grid-container-join").style.display = "block";
  document.getElementById("sve").style.backgroundColor = "gray";
  document.getElementById("report").style.backgroundColor = "gray";
  document.getElementById("ask").style.backgroundColor = "gray";
  document.getElementById("kill").style.backgroundColor = "gray";
  document.getElementById("exit").style.backgroundColor = "blue";            
}




function renderKills(search) {
  let container = $(".grid-container-death");
  container.html("");
  currentMenu = 2;


  for (var i = kills.length-1; i >= 0; i--) {
    let log = kills[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '      <div class="grid-item-death " >      '
      +'<p class="headc">'+ log.name +':'+ log.target+'</p>'
      +'<hr  style="color:black;margin:2px;"> '   +strings.killercoords+' : '+log.killerCoords+'</p>'
      +'<p class="mainc">'+strings.targetcoords+' : '+log.targetCoords+'</p>'
  
      +'</div>';
                   

      container.append(html);
    }
  }

  document.getElementById("grid-container-sve").style.display = "none";
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "block";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("sve").style.backgroundColor = "gray";
                document.getElementById("report").style.backgroundColor = "gray";
                document.getElementById("ask").style.backgroundColor = "gray";
                document.getElementById("kill").style.backgroundColor = "blue";
                document.getElementById("exit").style.backgroundColor = "gray"; 
}


function renderVehicles(search) {
  let container = $(".grid-container-sve");
  container.html("");
  currentMenu = 3;


  for (var i = vehicles.length-1; i >= 0; i--) {
    let log = vehicles[i];
    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="item">'
      +'<h3>'+log.name+'</h3>'
      +'<p><i class="fas fa-car"></i> '+log.target+'</p>'
      +'<p><i class="fas fa-map-marker-alt"></i> '+strings.localisation+' : '+log.coords+'</p>'
      +'<p><i class="far fa-clock"></i> '+log.date+'</p>'
      +'<p><i class="fas fa-id-card"></i> '+log.steamID+'</p>'
      +'</div>';

      container.append(html);
    }
  }
}


function renderWeapons(search) {
  let container = $(".grid-container-sve");
  container.html("");
  currentMenu = 4;


  for (var i = weapons.length-1; i >= 0; i--) {
    let log = weapons[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="item">'
      +'<h3>'+log.name+'</h3>'
      +'<p><i class="fas fa-rocket"></i> '+log.target+'</p>'
      +'<p><i class="far fa-clock"></i> '+log.date+'</p>'
      +'<p><i class="fas fa-id-card"></i> '+log.steamID+'</p>'
      +'</div>';

      container.append(html);
    }
  }
}


function renderChat(search) {
  let container = $(".grid-container-sve");
  container.html("");
  currentMenu = 5;


  for (var i = chat.length-1; i >= 0; i--) {
    let log = chat[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="item">'
      +'<h3>'+log.name+'</h3>'
      +'<p><i class="fas fa-comment-dots"></i> '+log.target+'</p>'
      +'<p><i class="far fa-clock"></i> '+log.date+'</p>'
      +'<p><i class="fas fa-id-card"></i> '+log.steamID+'</p>'
      +'</div>';

      container.append(html);
    }
  }
}

function renderReports(search) {
  let container = $(".grid-container-report");
  container.html("");
  currentMenu = 1;


  for (var i = reports.length-1; i >= 0; i--) {
    let log = reports[i];
    if(search==null || log.name.toLowerCase().includes(search) || log.txt.toLowerCase().includes(search)) {
      let html = ' <div class="grid-item-report" id="' + log.name + '">'
      +'<input type="button"  class="done " value="X" onclick="dodone('+log.name+');">'
      +'<p class="headc"> REPORT: '+log.name+ '['+log.id+']'+'</p>'
      +'<hr style="color:black;margin:2px;">'      
      +'<p class="mainc">' +txt+'</p>'
      +'</div>';

      container.append(html);
    }
  }

  document.getElementById("grid-container-sve").style.display = "none";
  document.getElementById("grid-container-report").style.display = "none";
  document.getElementById("grid-container-ask").style.display = "none";
  document.getElementById("grid-container-death").style.display = "none";
  document.getElementById("grid-container-join").style.display = "block";
  document.getElementById("sve").style.backgroundColor = "gray";
  document.getElementById("report").style.backgroundColor = "gray";
  document.getElementById("ask").style.backgroundColor = "gray";
  document.getElementById("kill").style.backgroundColor = "gray";
  document.getElementById("exit").style.backgroundColor = "blue";            
}




function closeMenu() {
  $("#box").addClass("hidden");
  sendData("closeMenu", {});
}




function sendData(event, data) {
    $.post('http://'+resourceName+'/'+event, JSON.stringify(data));
}





window.onload = function(e){
  // NUI Callback
  window.addEventListener('message', function(event){
    var mes = event.data;

    if(mes.show) {
      $("#box").removeClass("hidden");


      connections = mes.connections;
      kills = mes.kills;
      reports = mes.reports;
      vehicles = mes.vehicles;
      weapons = mes.weapons;
      chat = mes.chat;


      renderConnections();
    }
    else{
      closeMenu();

    }

    if(mes.setResourceName) {
      resourceName = mes.name;
    }


    if(mes.setString) {
      strings.killercoords = mes.killercoords;
      strings.targetcoords = mes.targetcoords;
      strings.localisation = mes.localisation;
    }
  });
};
