var redis = require("redis")

clientRI = redis.createClient() // Subscribes to ri channel
clientStudent = redis.createClient()// Publishes to student channel

clientRI.subscribe("referential integrity");

clientRI.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + " channel.")
});

clientRI.on("message", function (channel, message) { // Listens for ri channel JSON messgages
    console.log("Channel name: " + channel);
    console.log("Message: " + message);
    obj = JSON.parse(message)

    // Publish to the students microservice
    if (obj.sender == "courses_micro_service") {
        clientStudent.publish("students microservice", message);
        console.log("Published to students microservice \t" +  message)
    }
    // Publish to the courses microservice 
    else if (obj.sender == "students_micro_service") {
        clientStudent.publish("courses microservice", message);
        console.log("Published to courses microservice" +  message)
    }
    
});