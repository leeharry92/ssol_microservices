# Courses Microservice
(brief description)

### 1. INSTALLING DEPENDENCIES
##### Dependencies (see package.json for versions):
  - cookie-parser
  - body-parser
  - method-override
  - morgan
  - errorhandler
  - mongoose
  - nconf
< br>
##### Dependencies Installation:
```sh
  $ npm install
```

### 2. CONFIGURATION
All configurable parameters are accessible the following JSON file:
   - /courses_service/config/config.json

##### A. Server Configurables
  -  mongo.host : <host> {type: string}
  -  mongo.port : <port> {type: integer}

##### B. Schema Configurables
  -  courseAttributes : <key(s)> {type: string array}
  -  Attributes can also be added and removed via API (see Section 4 under 'MODIFY THE SCHEMA')

### 3. Launch:
```sh
  $ nodemon app.js
```


### 4. API Documentation (as Command Line Templates):

From the command line, following APIs can be executed:

##### CREATE A NEW COURSE
```sh
$ curl -H "Content-Type: application/json" -X POST -d '{"name":"<course_name>"}' http://<host>:<port>/courses/
```

##### GET COURSE INFORMATION

###### - ALL COURSES:
```sh
$ curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses/
```
###### - ONE COURSE:
```sh
$ curl -H "Content-Type: application/json" -X GET http://<host>:<port>/courses?name=<course_name>
```

##### ADD A STUDENT TO A COURSE
```sh
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"students":{"lastname":"<lastname>","firstname":"<firstname>"}}' http://<host>:<port>/courses?name=<course_name>
```

##### DELETE A COURSE
```sh
$ curl -H "Content-Type: application/json" -X DELETE http://<host>:<port>/courses?name=<course_name>
```
Note: '%20' can be used for one whitespace (i.e. <course_name> = course%204 --> 'course 4')

##### REMOVE A STUDENT FROM ONE COURSE
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"<lastname>","firstname":"<firstname>"}}' http://<host>:<port>/courses/<course_name>
```

##### REMOVE A STUDENT FROM ALL COURSES
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"<lastname>","firstname":"<firstname>"}}' http://<host>:<port>/student
```

##### MODIFY THE SCHEMA

###### -ADD A USER-DEFINED KEY TO THE SCHEMA:
```sh
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"key":"<key>"}' http://<host>:<port>/schema/courses
```
###### -UPDATE A USER-DEFINED KEY IN A DOCUMENT:
```sh
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"attribute1":<key_value>}' http://<host>:<port>/courses?name=<course_name>
```
###### -DELETE A USER-DEFINED KEY IN THE SCHEMA:
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"key":"<key>"}' http://<host>:<port>/schema/courses
```

### 5. Examples



