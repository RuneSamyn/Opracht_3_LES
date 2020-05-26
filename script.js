var client = mqtt.connect("ws://test.mosquitto.org:8080/ws")

client.subscribe("CHANGE_DETECTED")

client.on("message", function (topic, payload) {
if(topic == "CHANGE_DETECTED")
{
    var data = JSON.parse(payload.toString());
    if(data.port == 2){
        if(data.value == 1){
            document.getElementById("input1").style.backgroundColor = "green";
        } else if(data.value == 0){
            document.getElementById("input1").style.backgroundColor = "red";
        }
    } else if(data.port == 3){
        if(data.value == 1){
            document.getElementById("input2").style.backgroundColor = "green";
        } else if(data.value == 0){
            document.getElementById("input2").style.backgroundColor = "red";
        }
    }
}
//client.end()
})

client.publish("SET_OUTPUT", "hello world!")
