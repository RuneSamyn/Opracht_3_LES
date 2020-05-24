var mqtt = require('mqtt');
var onoff = require('onoff');

var client  = mqtt.connect('mqtt://test.mosquitto.org')


client.on('connect', () => {
  client.subscribe('SET_OUTPUT', err => { 
      if(err) 
        console.log(err)
    });
});


client.on('message', (topic, message) => {
  console.log(`topic: ${topic}, message: ${message}`);
})
