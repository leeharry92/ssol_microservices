db = db.getSiblingDB('test_server');
db.dropDatabase();

db = db.getSiblingDB('test_server');
db.createCollection('courses_models', {});
db.createCollection('snapshot_courses_models', {});


// COURSES DB
db.courses_models.insert(	
  {
    "_id": "56572018bf19f304248050f0",
    "course_id": 1111,
    "name": "Programming Languages and Translators",
    "instructor": "Stephen Edwards",
    "__v": 2,
    "students": [
      {
        "uni": "aa1111"
      },
      {
        "uni": "bb1111"
      }
    ]

  }
);

db.courses_models.insert(	
  {
    "_id": "56572018bf19f304248050f0",
    "course_id": 2222,
    "name": "Microservices",
    "instructor": "Don Ferguson",
    "__v": 2,
    "students": [
      {
        "uni": "aa1111"
      }
    ]

  }
);


db.courses_models.insert(	
  {
    "_id": "56572018bf19f304248050f0",
    "course_id": 3333,
    "name": "Computer Networks",
    "instructor": "Vishal Misra",
    "__v": 2,
    "students": [
      {
        "uni": "aa1111"
      },
      {
        "uni": "bb1111"
      }
    ]

  }
);


db.courses_models.insert(	
  {
    "_id": "56572018bf19f304248050f0",
    "course_id": 4444,
    "name": "Advanced Logic Design",
    "instructor": "Steven Nowick",
    "__v": 2,
    "students": [
      {
        "uni": "aa1111"
      }
    ]

  }
);


db.courses_models.insert(	
  {
    "_id": "56572018bf19f304248050f0",
    "course_id": 5555,
    "name": "IoT Theory and Practice",
    "instructor": "Zoran Kostic",
    "__v": 2,
    "students": [
      {
        "uni": "bb1111"
      }
    ]

  }
);






// SNAPSHOTS --------------

// Al Aho
db.snapshot_courses_models.insert(
  {
    "uni": "aa1111",
    "course_id": "1111"
  }
);
db.snapshot_courses_models.insert(
  {
    "uni": "aa1111",
    "course_id": "2222"
  }
);
db.snapshot_courses_models.insert(
  {
    "uni": "aa1111",
    "course_id": "3333"
  }
);
db.snapshot_courses_models.insert(
  {
    "uni": "aa1111",
    "course_id": "4444"
  }
);



// BEN BARG
db.snapshot_courses_models.insert(
  {
    "uni": "bb1111",
    "course_id": "1111"
  }
);
db.snapshot_courses_models.insert(
  {
    "uni": "bb1111",
    "course_id": "3333"
  }
);
db.snapshot_courses_models.insert(
  {
    "uni": "bb1111",
    "course_id": "5555"
  }
);




/*
# POST student
curl -X POST -G 'http://localhost:4000/courses' -d course_id=1111 -d name=Microservices

# POST student
localhost:4000/courses/15/students?uni=phb2114
*/







