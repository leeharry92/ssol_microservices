# Courses Microservice
(brief description)

<br /> 
<br /> 
### 1. INSTALLING DEPENDENCIES
##### Dependencies (see package.json for versions):
  - cookie-parser
  - body-parser
  - method-override
  - morgan
  - errorhandler
  - mongoose
  - nconf

##### Dependencies Installation:
```sh
  $ npm install
```

<br /> 

<br /> 

### 2. CONFIGURATION
All configurable parameters are accessible the following JSON file:
   - /courses_service/config/config.json

<br /> 

##### A. Server Configurables
  -  mongo.host : <host> {type: string}
  -  mongo.port : <port> {type: integer}

<br /> 

##### B. Schema Configurables
  -  courseAttributes : <key(s)> {type: string array}
  -  Attributes can also be added and removed via API (see Section 4 under 'MODIFY THE SCHEMA')

<br /> 

<br /> 

### 3. Launch:
```sh
  $ nodemon app.js
```

<br /> 

<br /> 

### 4. API Documentation (as CURL Templates):

From the command line, following APIs can be executed:

<br /> 

##### A. CREATE A NEW COURSE
```sh
$ curl -H "Content-Type: application/json" -X POST -d '{"course_num":<course_call_number>, "name":<course_name>}' http://<host>:<port>/courses/
```

<br /> 

##### B. GET COURSE INFORMATION

###### - ALL COURSES:
```sh
$ curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses/
```
###### - ONE COURSE:
```sh
$ curl -H "Content-Type: application/json" -X GET http://<host>:<port>/courses?course_num=<course_call_number>
```

<br /> 

##### C. ADD A STUDENT TO A COURSE
```sh
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"uni":<unique_id>,"lastname":"<lastname>","firstname":"<firstname>"}' http://<host>:<port>/courses?course_num=<course_call_number>
```

<br /> 

##### D. DELETE A COURSE
```sh
$ curl -H "Content-Type: application/json" -X DELETE http://<host>:<port>/courses?course_num=<course_call_number>
```

<br /> 

##### E. REMOVE A STUDENT FROM ONE COURSE
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"uni":<unique_id>}' http://<host>:<port>/courses/<course_call_number>
```

<br /> 

##### F. REMOVE A STUDENT FROM ALL COURSES
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"uni":<unique_id>,"lastname":"<lastname>","firstname":"<firstname>"}' http://<host>:<port>/student
```

<br /> 

##### G. MODIFY THE SCHEMA

###### -ADD A USER-DEFINED KEY TO THE SCHEMA:
```sh
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"key":"<key>"}' http://<host>:<port>/schema/courses
```
###### -UPDATE A USER-DEFINED KEY IN A DOCUMENT:
```sh
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"attribute1":<key_value>}' http://<host>:<port>/courses?course_num=<course_call_number>
```
###### -DELETE A USER-DEFINED KEY IN THE SCHEMA:
```sh
$ curl -i -X DELETE -H 'Content-Type: application/json' -d '{"key":"<key>"}' http://<host>:<port>/schema/courses
```

<br /> 

<br /> 

### 5. Example

<br /> 

##### A. Set Configuration (/courses_service/config/config.json)

```json
{
  "mongo": {
    "host": "localhost/test_server",
    "port": 3000
  },
  "courseAttributes": [
    "instructor"
  ]
}
```

<br /> 

##### B. POST a course and PUT a student to that course
```sh
curl -H "Content-Type: application/json" -X POST -d '{"course_num":9999,"name":"Microservices and APIs"}' http://localhost:3000/courses/

	curl -i -X PUT -H 'Content-Type: application/json' -d '{"uni":"phb2114","lastname":"Burrows","firstname":"Peter"}' http://localhost:3000/courses?course_num=9999
```


```json
[
     {
          "_id": "563bf7d76d2689cb31735bd8",
          "course_num": 9999,
          "name": "Microservices and APIs",
          "updated_at": "2015-11-06T00:44:07.474Z",
          "instructor": null,
          "__v": 1,
          "students": [
               {
                    "uni": "PHB2114",
                    "lastname": "Burrows",
                    "firstname": "Peter",
                    "_id": "563bf7d86d2689cb31735bd9"
               }
          ]
     }
]
```

<br /> 

##### C. PUT a value to the user-defined key

Note: The key, "instructor", was previously initialized in the config.json file

```sh
curl -i -X PUT -H 'Content-Type: application/json' -d '{"instructor":"Don Ferguson"}' http://localhost:3000/courses?course_num=9999
```


```json
[
     {
          "_id": "563bf7d76d2689cb31735bd8",
          "course_num": 9999,
          "name": "Microservices and APIs",
          "updated_at": "2015-11-06T00:44:07.474Z",
          "instructor": "Don Ferguson",
          "__v": 1,
          "students": [
               {
                    "uni": "PHB2114",
                    "lastname": "Burrows",
                    "firstname": "Peter",
                    "_id": "563bf7d86d2689cb31735bd9"
               }
          ]
     }
]
```

<br /> 

##### D. POST another user-defined key and PUT a value to the key

```sh
curl -i -X POST -H 'Content-Type: application/json' -d '{"key":"ROOM"}' http://localhost:3000/schema/courses

curl -i -X PUT -H 'Content-Type: application/json' -d '{"ROOM":"428 Pupin"}' http://localhost:3000/courses?course_num=9999
```


```json
[
     {
          "_id": "563bf8e2bcecae0632d0da42",
          "course_num": 9999,
          "name": "Microservices and APIs",
          "updated_at": "2015-11-06T00:48:34.573Z",
          "instructor": "Don Ferguson",
          "ROOM": "428 Pupin",
          "__v": 0,
          "students": [
               {
                    "uni": "PHB2114",
                    "lastname": "Burrows",
                    "firstname": "Peter",
                    "_id": "563bf89ebcecae0632d0da41"
               }
          ]
     }
]
```

<br /> 

##### E. DELETE a user-defined key and DELETE a student from a course
```sh
curl -i -X DELETE -H 'Content-Type: application/json' -d '{"key":"instructor"}' http://localhost:3000/schema/courses

curl -i -X DELETE -H 'Content-Type: application/json' -d '{"uni":"phb2114"}' http://localhost:3000/courses/9999
```

```JSON
[
     {
          "_id": "563bf95abcecae0632d0da43",
          "course_num": 9999,
          "name": "Microservices and APIs",
          "updated_at": "2015-11-06T00:50:34.218Z",
          "ROOM": "428 Pupin",
          "__v": 0,
          "students": []
     }
]
```

<br /> 

<br /> 





