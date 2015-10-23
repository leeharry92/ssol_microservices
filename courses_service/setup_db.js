db = db.getSiblingDB('courses_service');
db.dropDatabase();
db = db.getSiblingDB('courses_service');
db.createCollection('Courses', {});
db.Courses.insert(
	{
		"call_number": 12632,
		"subject": "Czech",
		"points": "4",
		"location": "406 Hamilton Hall",
		"instructor_first_name": "Christopher",
		"instructor_last_name": "Harwood",
		"days": ["Monday", "Wednesday", "Friday"],
		"time": ["10:10am-11:25am", "10:10am-11:25am", "10:10am-11:25am"],
		"enrolled_unis": ["dd8054", "hh2473", "ed3239", "dj9339"]
	}
);

db.Courses.insert(
	{
		"call_number": 11632,
		"subject": "Czech",
		"points": "4",
		"location": "406 Hamilton Hall",
		"instructor_first_name": "Christopher",
		"instructor_last_name": "Harwood",
		"days": ["Monday", "Wednesday", "Friday"],
		"time": ["11:40am-12:55pm", "11:40am-12:55pm", "11:40am-12:55pm"],
		"enrolled_unis": ["dd8054", "hh2473", "ed3239", "dj9339"]
	}
);

db.Courses.find().pretty()



