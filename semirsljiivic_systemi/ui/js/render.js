var resourceName = '';

var connections = [];
var kills = [];
var vehicles = [];
var weapons = [];
var chat = [];

var currentMenu = 1;
var strings = {};
let darkmode = false;

function renderConnections(search) {
  let container = $("#grid-container-sve");
  container.html("");
  currentMenu = 1;


  for (var i = connections.length-1; i >= 0; i--) {
    let log = connections[i];
    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search)) {
      let html = '      <div class="grid-item-join " style="display:none;" >      '
      +'<p class="headc">'+log.name+'</p>'
      +'<hr style="color:black;margin:2px;"> '+log.info
      +'<p class="mainc">'+log.date+log.steamID+'</p>'
      +'</div>';


      container.append(html);
    }
  }

  disableallexcepte();

}



function renderKills(search) {
  let container = $("#grid-container-sve");
  container.html("");
  currentMenu = 2;


  for (var i = kills.length-1; i >= 0; i--) {
    let log = kills[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="grid-item-death 3" id="svekill"">'
      +'<p class="headc">'+log.name+' : '+log.target+'</p>'
      +'<hr  style="color:black;margin:2px;"> '
      +'<p class="mainc"> '+strings.killercoords+' : '+log.killerCoords+strings.targetcoords+' : '+log.targetCoords+'</p>'
      +'</div>';

      container.append(html);
    }
  }
  disableallexceptd();
}


function renderVehicles(search) {
  let container = $("#grid-container-sve");
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
  let container = $("#grid-container-sve");
  container.html("");
  currentMenu = 4;


  for (var i = weapons.length-1; i >= 0; i--) {
    let log = weapons[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="grid-item-ask '+log.id+'">'
      +'<input type="button" class="done" value="X" onclick="dodone('+log.id+');">'    
      +'<p class="headc"> Ask: '+log.name+' ['+log.id+']'+'</p>'
      +'<hr style="color:black;margin:2px;">'
      +'<p class="mainc">'+log.poruka+'</p>'
      +'</div>';  

      container.append(html);
    }
  }
  disableallexceptc();
}



function renderChat(search, what) {
  let container = $("#grid-container-sve");
  container.html("");
  currentMenu = 5;


  for (var i = chat.length-1; i >= 0; i--) {
    let log = chat[i];

    if(search==null || log.name.toLowerCase().includes(search) || log.steamID.toLowerCase().includes(search) || log.target.toLowerCase().includes(search)) {
      let html = '<div class="grid-item-report '+log.id+'">'
      +'<input type="button" id="" class="done" value="X" onclick="dodone('+log.id+');">'    
      +'<p class="headc"> Report: '+log.name+' ['+log.id+']'+'</p>'
      +'<hr style="color:black;margin:2px;">'
      +'<p class="mainc">'+log.poruka+'</p>'
      +'</div>';  


      container.append(html);
    }
  }
      disableallexceptb();
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
      vehicles = mes.vehicles;
      weapons = mes.weapons;
      chat = mes.chat;

      renderConnections();
      renderKills();
      renderChat();
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
