
$(function(){
  // ARRAY OF STREAMERS
  var streams = ['captaintutu','zomgswag','shroud','loltyler1','arsibra','adobe'];

  $.getJSON('https://api.twitch.tv/kraken/streams/captaintutu?client_id=5tt1wb07yb0mt3itmuy6jm64msvm9g').done (function(data){
  // PULLING IF FCC IS OFFLINE OR ONLINE
  if(data.stream === null){
    $('#fccStatus').html(' is offline');
  }else {
    $('#fccStatus').html(' is Online!');
  }
  });
  // FOR LOOP THROUGH ARRAY OF STREAMERS
  for (var i = 0; i < streams.length; i++){
  // AJAX CALL FOR INDIVIDUAL STREAMERS
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/'+ streams[i],
      headers:{
        'client-ID':'5tt1wb07yb0mt3itmuy6jm64msvm9g'
      },
      success: function(dataI){
       console.log(dataI);

        $.getJSON('https://api.twitch.tv/kraken/streams/'+ dataI.name +'?client_id=5tt1wb07yb0mt3itmuy6jm64msvm9g').done (function(data2){
        // console.log(data2);

        var name = data2._links.self.slice(37);
        // console.log(name);

        if(data2.stream === null){
          $('#userName').append('<a target= "blank" href= "https://www.twitch.tv/' + name +  '">'+ name + '</a></br>');
          $('#userStatus').append('offline <br>');
          $('#userGame').append('Nothing <br>');
        }else {
          $('#userName').append('<a target= "blank" href= "https://www.twitch.tv/' + name +  '">'+ name + '</a></br>');
          $('#userStatus').append('online <br>');
          $('#userGame').append(data2.stream.game + '<br>');
         }
        });

      },
      error: function(err){
        $('#userName').append(streams[i] + '<br>');
        $('#userStatus').append('Offline <br>');
        $('#userGame').append('Not Playing Anything :( <br>')
      },
    });
  };
});
