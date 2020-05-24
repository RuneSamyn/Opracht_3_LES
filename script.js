var client = mqtt.connect("ws://test.mosquitto.org:1883/ws")
client.subscribe("CHANGE_DETECTED")

client.on("message", function (topic, payload) {
    alert([topic, payload].join(": "))
})

client.publish("test_send", "hello world!")
