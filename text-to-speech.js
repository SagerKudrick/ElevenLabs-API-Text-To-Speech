// This program accesses 11Labs api to convert text to speech, downloading it to an .mp3 file.
// You need to add your xi-api-key to options.json, as well as your voice_id. Your xi-api-key
// can be found on your 11Labs profile, and you can use https://github.com/SagerKudrick/elevenlabs_get_custom_voiceID
// to get your custom voice IDs.

// This program makes a post request using 11Labs api with the specified text to be
// converted to speech, which returns a binary stream that we use fs to save as an .mp3. 

var request = require('request');
var fs = require('fs');

var options = require('./options.json')
var stability = 0.55 // needs to be a decimal. This is equivelent to 55% on the slider
var similarity_boost = 0.70 // needs to be a decimal. This is equivelent to 70% on the slider
var filename = "helloworld.mp3" // output mp3 file
var message = "hello, world" // text we want to convert to speech

var options = {
  'method': 'POST',
  'url': 'https://api.elevenlabs.io/v1/text-to-speech/' + options.voice_id,
  'headers': {
    'xi-api-key': options.api_key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "text": message,
    "voice_settings": {
      "stability": stability,
      "similarity_boost": similarity_boost
    }
  }),
  encoding: null // convert the returned data to binary so we can create an mp3 with it

};

request(options, function (error, response, data) {
  if (error) throw new Error(error);
  console.log("Saving file...");
  fs.writeFileSync(filename, data, { encoding: 'binary'});
	console.log(filename + " successfully saved.")
});
