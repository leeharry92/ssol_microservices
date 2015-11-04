# ssol_microservices

Things to note before beginning:

In order to implement sharding my last names, three instance of the services need to be instantiated, each connected to a different database. The databases are sharded by last names in the following way:

students_service_1: A-H
students_service_2: I-Q
students_service_3: R-Z

Thus in order to typically run the students service, one would have to 
1) Instantiate each of the three Node instances 
2) Initialize each of the sharded databases
3) Connect each service with the corresponding database

Below we outline the steps to achieve the above - please replace <number> with the service instance being instantiated.

To set up the database:
1. run mongod on separate terminal window (This step is done only once)
```
	mongod [--dbpath ./data/]
```	
2. run mongo to setup the database
```	
	mongo students_service_<number> db_scripts/setup_db_<number>.js
```
3. modify the following line in config file to the appropriate number (config/env/development.js)
```	
	port: process.env.PORT || 300<number>,
	db: 'mongodb://0.0.0.0/students_service_<number>'
```

Before you run the application:
run "npm install"

To run the app:
run "node app.js"
