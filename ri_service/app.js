var redis = require("redis")

clientRI = redis.createClient() // Subscribes to ri channel
clientStudent = redis.createClient()// Publishes to student channel
clientCourse = redis.createClient()

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
        // Parse the JSON message and publish message to student channel
        switch (obj.action) {
            case "update student add course":
            break;
            case "update student delete course":
            break;
            case "delete course":
            break;
        }
        
        clientStudent.publish("students microservice", message);
        console.log("Published to students microservice \t" +  message)
        
    }
    
    // Publish to the courses microservice 
    else if (obj.sender == "students_micro_service") {
        // Parse the JSON message and publish message to course channel
        switch (obj.action) {
            case "update course add student":
            break;
            case "update course delete student":
            break;
            case "delete student"
            break;
        }

        clientCourse.publish("courses microservice", message);
        console.log("Published to courses microservice" +  message)
    }
    
});