db = db.getSiblingDB('students_service_2');
db.dropDatabase();
db = db.getSiblingDB('students_service_2');
db.createCollection('Students', {});
db.Students.insert(
	{
		"first_name": "Ian",
		"last_name": "Iverson",
		"address": "123 High Street",
		"class": 2016,
		"uni": "ii1111",
		"major": "Computer Science",
		"minor": "Entrepreneurship",
		"courses": [2222, 3333, 6666, 7777]
	}
);

db.Students.insert(
	{
		"first_name": "John",
		"last_name": "Johnson",
		"address": "1230 Cross Street",
		"class": 2015,
		"uni": "jj1111",
		"major": "Computer Engineering",
		"minor": "French",
		"courses": [0000, 4444, 5555, 8888]
	}
);



