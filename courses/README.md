
# INSTALL DEPENDENCIES within the 'courses' directory
npm install cookie-parser
npm install body-parser
npm install method-override
npm install morgan
npm install errorhandler
npm install mongoose

# To Launch:
nodemon app.js


# ==========================================
# THE COURSES APIs (Command Line Templates)
# ==========================================
From another command line, you can execute the following APIs:
(Note: in the browser, you can view all courses via http://localhost:3000/courses)


#API TO CREATE A NEW COURSE

	curl -H "Content-Type: application/json" -X POST -d '{"name":"course4"}' http://localhost:3000/courses/



#API TO READ COURSES

	#--ALL COURSES: 
	curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses/

	#--ONE COURSE:
	curl -H "Content-Type: application/json" -X GET http://localhost:3000/courses?name=course4



#API TO ADD A STUDENT TO A COURSE

	curl -i -X PUT -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/courses?name=course4



#API TO DELETE A COURSE

	curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/courses?name=course4
	curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/courses?name=course%201 # %20 for spaces


#API TO REMOVE STUDENT FROM COURSE

	curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/courses/course4



#API TO REMOVE A STUDENT FROM ALL COURSES

	curl -i -X DELETE -H 'Content-Type: application/json' -d '{"students":{"lastname":"Burrows","firstname":"Peter"}}' http://localhost:3000/student








