db = db.getSiblingDB('students_service_1');
db.dropDatabase();
db = db.getSiblingDB('students_service_1');
db.createCollection('Students', {});
db.Students.insert(
	{
		"first_name": "Al",
		"last_name": "Aho",
		"address": "123 High Street",
		"class": 2016,
		"uni": "aa1111",
		"major": "Electrical Engineering",
		"minor": "Entrepreneurship",
		"courses": [1111, 2222, 3333, 4444]
	}
);

db.Students.insert(
	{
		"first_name": "Ben",
		"last_name": "Barg",
		"address": "1230 Cross Street",
		"class": 2016,
		"uni": "bb1111",
		"major": "Computer Engineering",
		"minor": "French",
		"courses": [1111, 3333, 5555]
	}
);



