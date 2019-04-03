// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

/* In order to run the server we are using python 2.7 ant its httpserver
python -m SimpleHTTPServer 8080
*/

let classifier;
let video;

function setup() {
	noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#size').html("\n Number of results: " + results.length);

  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
  changeBackground(results[0].className);

}
function changeBackground(keyword){
	$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	{
		tags: keyword,
		tagmode: "any",
		format: "json"
	},
	function(data) {
		var rnd = Math.floor(Math.random() * data.items.length);

		var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

		$('body').css('background-image', "url('" + image_src + "')");

	});
}
