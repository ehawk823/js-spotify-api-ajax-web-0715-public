var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0,20);
}

function extractNumberOfStreams(tracks) {
    return tracks.map(function(track) {
	     return track.num_streams;
    });
}

function extractNames(tracks) {
  return tracks.map(function(track) {
     return track.track_name;
  });}

function chartData(labels, inputData) {
  // your code here
  var object = { 'labels' : labels, 'datasets' : [{
    label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data : inputData }],
  // use the dataSetProperties variable defined above if it helps
};
  return object;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  $.ajax ({
    url: url,
    dataType: 'JSONP',
    success: (function(data){
      callback(data);
    }
    )}
  );
}
  // use the url variable defined above if it helps

function success(parsedJSON) {
  var top = extractTop20Tracks(parsedJSON.tracks);
  var track_names = extractNames(top);
  var num_streams = extractNumberOfStreams(top);
  var data = chartData(track_names, num_streams);
  var ctx = document.getElementById("spotify_chart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
