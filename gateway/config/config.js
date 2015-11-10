'use strict';

module.exports = {
	port: process.env.ROUTER_PORT || 3000,
	students_port: process.env.STUDENTS_PORT || 3001,
	courses_port: process.env.COURSES_PORT || 4000,
	//db: 'mongodb://0.0.0.0/students_service'
};