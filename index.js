var mqtt = require('mqtt');
var Gpio = require('onoff').Gpio;

var client  = mqtt.connect('mqtt://test.mosquitto.org')

const output1 = new Gpio(22, 'out');
const output2 = new Gpio(23, 'out');
const input1 = new Gpio(2, 'in', 'both');
const input2 = new Gpio(3, 'in', 'both');

client.on('connect', () => {
  client.subscribe('SET_OUTPUT', err => { 
      if(err) 
        console.log(err)
    });
});

client.on('message', (topic, message) => {
    try{
        var data = JSON.parse(message);
        console.log(data);
    }
    catch {
        console.log(`message cannot be converted to JSON: ${message}`)
    }
    switch(data["port"])
    {
        case 22:
            output1.writeSync(data["value"]);
            console.log(`set output1/port${data["port"]} to ${data["value"]}`);
        break;
        case 23:
            output2.writeSync(data["value"]);
            console.log(`set output2/port${data["port"]} to ${data["value"]}`);

        break;
    }
})


input1.watch((err, value) => {
    client.publish('CHANGE_DETECTED', `{"port": 2, "value": ${input1.readSync()}}`);
    console.log(`input1: ${input1.readSync()}`);
});

input2.watch((err, value) => {
    client.publish('CHANGE_DETECTED', `{"port": 3, "value": ${input2.readSync()}}`);
    console.log(`input2: ${input2.readSync()}`);
});
