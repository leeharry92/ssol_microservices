db = db.getSiblingDB('students_service');
db.dropDatabase();
db = db.getSiblingDB('students_service');
db.createCollection('Students', {});
db.Students.insert(
	{
		"first_name": "Harry",
		"last_name": "Lee",
		"address": "123 High Street",
		"class": 2016,
		"uni": "hhl2114",
		"major": "Computer Science",
		"minor": "Entrepreneurship",
		"courses": [98054, 63453, 10762, 21107]
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
		"courses": [15415, 29215, 14730, 13818]
	}
);



