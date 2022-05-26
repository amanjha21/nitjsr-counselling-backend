const INITIALIZE_DATABASE_QUERY = `
USE ${process.env.DB_USER};

SET FOREIGN_KEY_CHECKS = 0;

drop table if exists admin;
drop table if exists admin_credentials;
drop table if exists admin_session;
drop table if exists logger;
drop table if exists center_incharge;
drop table if exists chairman;
drop table if exists secretary;
drop table if exists colleges;
drop table if exists notices;
drop table if exists student_credentials;
drop table if exists verifying_officers;
drop table if exists student;
drop table if exists student_attachments;
drop table if exists student_status;
drop table if exists result;
drop table if exists phase_merit_list;
drop table if exists phase_result;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE admin_credentials (
	email varchar(255) NOT NULL ,
	password varchar(255) NOT NULL,
	token varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE chairman (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE center_incharge (
	email varchar(255) NOT NULL ,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	college varchar(255) NOT NULL UNIQUE,
	college_email varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (email)
);

CREATE TABLE colleges (
	id varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	general_seats int NOT NULL,
	obc_seats int NOT NULL,
	sc_seats int NOT NULL,
	st_seats int NOT NULL,
	ews_seats int NOT NULL,
	pwd_general_seats int NOT NULL,
	pwd_obc_seats int NOT NULL,
	pwd_sc_seats int NOT NULL,
	pwd_st_seats int NOT NULL,
	pwd_ews_seats int NOT NULL,
	profile_image_url varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE verifying_officers (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	college varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE admin (
	email varchar(255) NOT NULL,
	designation enum('c', 's', 'ci', 'vo') NOT NULL,
	profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE student (
	regno varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	generalRank int NOT NULL UNIQUE,
	category enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	categoryRank int,
	currentSeatIndex int,
	seatAllotmentCategory enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	mobile varchar(20) UNIQUE,
	dob varchar(255),
	classTenMarks varchar(10),
	classTwelveMarks varchar(10),
	firstYearMarks varchar(10),
	secondYearMarks varchar(10),
	thirdYearMarks varchar(10),
	paymentDetails varchar(255),
	studentAction enum("freeze","float","reject"),
	preferences varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE student_attachments (
	regno varchar(255) NOT NULL,
	profileImage varchar(255),
	signature varchar(255),
	aadhaar varchar(255),
	classTen varchar(255),
	classTwelve varchar(255),
	firstYear varchar(255),
	secondYear varchar(255),
	thirdYear varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE result (
	regno varchar(255) NOT NULL,
	college varchar(255) NOT NULL,
	category enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	PRIMARY KEY (regno)
);

CREATE TABLE student_status (
	regno varchar(255) NOT NULL,
	applicationStatus enum('pending', 'verified', 'rejected') NOT NULL,
	failureDesc TEXT,
	acceptedBy varchar(255),
	rejectedBy varchar(255),
	confirmationPending bool,
	verifying_officer varchar(255) ,
	verifying_college varchar(255) ,
	categoryRejection bool,
	PRIMARY KEY (regno)
);

CREATE TABLE student_credentials (
	regno varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	token varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE secretary (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE logger (
	id INT AUTO_INCREMENT NOT NULL,
	timestamp DATETIME NOT NULL,
	ip varchar(255) NOT NULL,
	log varchar(255) NOT NULL,
	user varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE notices (
	id INT AUTO_INCREMENT NOT NULL,
	timestamp DATETIME NOT NULL,
	notice varchar(255) NOT NULL,
	user varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE admin_session (
	id INT AUTO_INCREMENT NOT NULL,
	timestamp DATETIME NOT NULL,
	ip varchar(255) NOT NULL,
	log varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE phase_merit_list (
	regno varchar(255) NOT NULL,
	phase int,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	generalRank int NOT NULL,
	category enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	categoryRank int,
	currentSeatIndex int,
	seatAllotmentCategory enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	dob varchar(255),
	mobile varchar(20),
	classTenMarks varchar(10),
	classTwelveMarks varchar(10),
	firstYearMarks varchar(10),
	secondYearMarks varchar(10),
	thirdYearMarks varchar(10),
	paymentDetails varchar(255),
	studentAction enum("freeze","float","reject"),
	preferences varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE phase_result (
	regno varchar(255) NOT NULL,
	phase INT,
	college varchar(255) NOT NULL,
	category enum("obc","sc","st","ews","pwd_general","pwd_obc","pwd_sc","pwd_st","pwd_ews"),
	PRIMARY KEY (regno)
);

ALTER TABLE admin_credentials ADD CONSTRAINT admin_credentials_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE chairman ADD CONSTRAINT chairman_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk1 FOREIGN KEY (college) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk1 FOREIGN KEY (college) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk1 FOREIGN KEY (college) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE student_attachments ADD CONSTRAINT student_attachments_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk1 FOREIGN KEY (acceptedBy) REFERENCES admin(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk2 FOREIGN KEY (rejectedBy) REFERENCES admin(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk3 FOREIGN KEY (verifying_officer) REFERENCES verifying_officers(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk4 FOREIGN KEY (verifying_college) REFERENCES colleges(id) ON DELETE SET NULL;

ALTER TABLE student_credentials ADD CONSTRAINT student_credentials_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE secretary ADD CONSTRAINT secretary_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

`;

module.exports = INITIALIZE_DATABASE;
