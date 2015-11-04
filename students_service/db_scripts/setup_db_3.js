db = db.getSiblingDB('students_service_3');
db.dropDatabase();
db = db.getSiblingDB('students_service_3');
db.createCollection('Students', {});
db.Students.insert(
	{
		"first_name": "Jivtesh",
		"last_name": "Singh",
		"address": "123 High Street",
		"class": 2014,
		"uni": "jsc2226",
		"major": "Electrical Engineering",
		"minor": "Gender Studies",
		"courses": [1111, 4444, 9999, 0000]
	}
);

db.Students.insert(
	{
		"first_name": "Alan",
		"last_name": "Zhu",
		"address": "1230 Cross Street",
		"class": 2014,
		"uni": "az1234",
		"major": "Psychology",
		"minor": "Spanish",
		"courses": [2222, 3333, 6666, 5555]
	}
);



