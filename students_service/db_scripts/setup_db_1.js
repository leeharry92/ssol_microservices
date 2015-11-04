db = db.getSiblingDB('students_service_1');
db.dropDatabase();
db = db.getSiblingDB('students_service_1');
db.createCollection('Students', {});
db.Students.insert(
	{
		"first_name": "Jonathan",
		"last_name": "Chang",
		"address": "123 High Street",
		"class": 2016,
		"uni": "jc4267",
		"major": "Electrical Engineering",
		"minor": "Entrepreneurship",
		"courses": [1111, 2222, 3333, 4444]
	}
);

db.Students.insert(
	{
		"first_name": "James",
		"last_name": "Hong",
		"address": "1230 Cross Street",
		"class": 2016,
		"uni": "hh2473",
		"major": "Computer Engineering",
		"minor": "French",
		"courses": [1111, 3333, 5555]
	}
);



