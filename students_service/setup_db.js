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
		"UNI": "hhl2114",
		"majors": ["Computer Science"],
		"minors":["Entrepreneurship"]
	}
);

db.Students.insert(
	{
		"first_name": "James",
		"last_name": "Hong",
		"address": "1230 Cross Street",
		"class": 2016,
		"UNI": "hh2473",
		"majors": ["Computer Engineering"],
		"minors": []
	}
);



