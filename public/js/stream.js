$(document).ready(function() {
	var player = document.getElementById('video_player');
	var client = new BinaryClient('ws://'+window.location.hostname+':9001');
	var stream;
	var media = new window.MediaSource();
	var url = URL.createObjectURL(media);
	var videoSource;

  player.src = url;


 media.addEventListener('sourceopen', function (e) {
  try {
    videoSource = media.addSourceBuffer('video/mp4');     
  } catch (e) {
    return;
  }
},false);

	client.on('open', function(){
		console.log('Stream opened at port 9001');
	  stream = client.createStream({
	  	id: player.getAttribute('play-id')
	  });

	  stream.on('data', function(data) {
	  	console.log(data);
	  	videoSource.appendBuffer(new Uint8Array(data));
	  });
	});


	console.log('player src being set');
  

});