
# INSTALL DEPENDENCIES
Dependencies: <br />
cookie-parser <br />
body-parser <br />
method-override <br />
morgan <br />
errorhandler <br />
mongoose <br />
<br />

To Install Dependencies (saved in package.json):
<br />
npm install
<br />
To Launch:
<br />
nodemon app.js


# THE COURSES APIs (Command Line Templates)

From another command line, you can execute the following APIs:
(Note: in the browser, you can view all courses via http://localhost:3000/courses)


### API TO CREATE A NEW COURSE ###

	curl -H "Content-Type: application/json" -X POST -d '{"name":"course4"}' http://localhost:3000/courses/


### API TO READ COURSES ###

	#--ALL COURSES: 
	curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses/

	#--ONE COURSE:
	curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses?name=course4


### API TO ADD A STUDENT TO A COURSE ###

	curl -i -X PUT -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/courses?name=course4


### API TO DELETE A COURSE ###

	curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/courses?name=course4
	curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/courses?name=course%201 # %20 for spaces


### API TO REMOVE STUDENT FROM COURSE ###

	curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/courses/course4


### API TO REMOVE A STUDENT FROM ALL COURSES ###

	curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/student


### API TO MODIFY SCHEMA ###

	#-- ADD A USER-DEFINED KEY TO THE SCHEMA:
	curl -i -X POST -H 'Content-Type: application/json' -d '{"key":"attribute1"}' http://localhost:3000/schema/courses

	#-- UPDATE A USER-DEFINED KEY IN A DOCUMENT:
	curl -i -X PUT -H 'Content-Type: application/json' -d '{"attribute1":"test"}' http://localhost:3000/courses?name=course4

	#-- DELETE A USER-DEFINED KEY IN THE SCHEMA:
	curl -i -X DELETE -H 'Content-Type: application/json' -d '{"key":"attribute1"}' http://localhost:3000/schema/courses

### MANUAL CONFIGURATION FOR SCHEMA ###





