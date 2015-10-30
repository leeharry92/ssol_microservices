var redis = require("redis")

client1 = redis.createClient() // Subscribes to ri channel
client2 = redis.createClient() // Publishes to student channel
client3 = redis.createClient() // Publishes to course channel

msg_count = 0;
 
client1.on("subscribe", function (channel, count) {
    console.log("Subscribed to ri channel...")
    client2.publish("a nice channel", "I am sending a message.");
    client2.publish("a nice channel", "I am sending a second message.");
    client2.publish("a nice channel", "I am sending my last message.");
});
 
client1.on("message", function (channel, message) { // Listens for ri channel JSON messgages
    console.log("client1 channel " + channel + ": " + message);
    msg_count += 1;
    obj = JSON.parse(message)
    console.log("event recieved is: " , obj.message)

    /*if (msg_count === 3) {
        client1.unsubscribe();
        client1.end();
        client2.end();
    }*/

    // Parse the JSON message and publish message to student or course channel
    switch (obj.message) {

        // Changes to courses microservice need to happen, publish to course channel
        case "update student add course":
            var message =JSON.stringify({"message": "update course add student", "uni": "jc4267", "course_name": "blah" })
            client3.publish("course channel", message)
        break;

        case "update student delete course":
            var message =JSON.stringify({"message": "update course delete student", "uni": "jc4267", "course_name": "blah" })
            client3.publish("course channel", message)
        break;

        case "delete student":
            var message =JSON.stringify({"message": "delete student", "uni": "jc4267" })
            client3.publish("course channel", message)
        break;

        // Changes to students microservice need to happen, publish to student channel
        case "update course add student":
            var message =JSON.stringify({"message": "update student add course", "uni": "jc4267", "course_name": "blah" })
            client2.publish("student channel", message)
        break;

        case "update course delete student":
            var message =JSON.stringify({"message": "update student delete course", "uni": "jc4267", "course_name": "blah" })
            client2.publish("student channel", message)
        break;

        case "delete course":
            var message =JSON.stringify({"message": "delete course", "course_name": "jc4267" })
            client2.publish("student channel", message)
        break; 

    }

});
 
client1.subscribe("ri channel");