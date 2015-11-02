# ssol_microservices

To set up the database:
1. run mongod on separate terminal window

	mongod [--dbpath ./data/]
	
2. run mongo to setup the database.
```	
	mongo students_service setup_db.js
```
Before you run the application:
run "npm install"

To run the app:
run "node app.js"
