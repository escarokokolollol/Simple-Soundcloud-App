// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//
//checks if url should be sent to localStorage
//
function playlistStorageHandler(url){

	var playlistsArray = JSON.parse(localStorage.getItem("playlists"));

	//first time open program
	if(localStorage.getItem("playlists") == null){
		var urlArray = [];
		urlArray.push(url);

		console.log(urlArray[0]);
		localStorage.setItem("playlists", JSON.stringify(urlArray));
	}
	//if playlist havnt been played before
	else if(!playlistsArray.includes(url)){
		playlistsArray.push(url);

		localStorage.clear();
		localStorage.setItem("playlists", JSON.stringify(playlistsArray));
		console.log('localstoarge uppdatering genomförd');

	}
	//if playlist have been played before
	else if(playlistsArray.includes(url)){

		var arrayIndex = playlistsArray.indexOf(url);
		playlistsArray.splice(arrayIndex, 1);

		playlistsArray.push(url);
		localStorage.clear();
		localStorage.setItem("playlists", JSON.stringify(playlistsArray));
		console.log('splice');
	}else{
		console.log('ingen localstorage uppdatering');
	}
}

//
//puts url from input to iframe
//
function getPlayList(url){
	SC.initialize({
		//ändra client id, denna är nån annans
		//client_id: 'vnXP54rdPUmuAgj55xEhzQH1jBJinMEc'
		//client_id: 'baddX667asbf3FG9890dvDSsj3f5igfa'

	});

	var track_url = url;

	SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
		var obj = (oEmbed);

		document.getElementById('iframe-div').innerHTML = obj.html;
		document.getElementById('iframe-div').getElementsByTagName('iframe')[0].id = "iframe";

		//send url to localStorage-function
		playlistStorageHandler(track_url);
	});
}

//
// send url from input on submit(enter)
//
document.getElementById('form').addEventListener('submit', function(evt){
	evt.preventDefault();
	var url = document.getElementById("track_url").value;

	getPlayList(url);
});

//
// shows recent playlists in popupbox
//
function onload(){
	var playlists = JSON.parse(localStorage.getItem("playlists"));
	var elem = document.getElementById('before-iframe');

	elem.innerHTML += "<h1>RECENT PLAYLISTS</h1> ";
	playlists = playlists.reverse();

	// this snippet makes removes values in arrray if occur more than once
	//playlists.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

	for (var i = 0; i < playlists.length; i++) {
		 elem.innerHTML += "<p class='playlists'>"+playlists[i]+"</p>";
	}
}
onload();

//
// toggles the popupbox on recentbtn-click
//
document.getElementById('recent-btn').addEventListener('click', function(evt){
		var elem = document.getElementById('before-iframe');

    if (elem.style.display !== 'none') {
      elem.style.display = 'none';
    }
    else {
			document.getElementById('before-iframe').innerHTML= " ";
			onload();
			addPlaylistLinkListener();
      elem.style.display = 'block';
    }
});

//
// addeventlistenerbyclass-function
//
function addEventListenerByClass(className, event, fn) {
    var list = document.getElementsByClassName(className);
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

//
//play playlist when click on link
//
function addPlaylistLinkListener(){
	addEventListenerByClass('playlists', 'click', function(){
		getPlayList(this.innerHTML);
		document.getElementById('before-iframe').style = "display:none;";
	});
}
addPlaylistLinkListener();












var widget;
var bool = false;
//
// playpause funktion som fakwtiskt funkar.
//
function playPause(){
  SC.initialize({
    //ändra client id, denna är nån annans
    client_id: '77ec4a0e70ef835e57efaf56677ea159'
  });

  widget = SC.Widget('iframe');
  if(!bool){
    widget.play();
    bool = true;
  }else{
    widget.pause();
    bool = false;
  }

}
