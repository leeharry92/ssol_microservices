var redis = require("redis")

<<<<<<< HEAD
clientRISub = redis.createClient() // Subscribes to ri channel
clientRIPub = redis.createClient()// Publishes to student channel
=======
clientRI = redis.createClient() // Subscribes to ri channel
clientStudent = redis.createClient()// Publishes to student channel
clientCourse = redis.createClient()
>>>>>>> 92fc740f531341847799091bfa8f623278f90ddc

clientRISub.subscribe("referential_integrity");

clientRISub.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + " channel.")
});

clientRISub.on("message", function (channel, message) { // Listens for ri channel JSON messgages
    console.log("Channel name: " + channel);
    console.log("Message: " + message);
    obj = JSON.parse(message)

    var publish_channel = "";

    // Publish to the students microservice
    if (obj.sender == "courses_micro_service") {
<<<<<<< HEAD
        publish_channel = "students_micro_service";      
=======
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
        
>>>>>>> 92fc740f531341847799091bfa8f623278f90ddc
    }
    
    // Publish to the courses microservice 
    else if (obj.sender == "students_micro_service") {
<<<<<<< HEAD
        publish_channel = "courses_micro_service";
=======
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
>>>>>>> 92fc740f531341847799091bfa8f623278f90ddc
    }

    clientRIPub.publish(publish_channel, message);
    console.log("Published to " + publish_channel +  message);
    
});