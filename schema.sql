
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
primary key (ID)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
primary key (ID),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT ,
manager_id INT,
primary key (ID),
FOREIGN KEY (manager_id) REFERENCES employee(id),
FOREIGN KEY (role_id) REFERENCES role(id),
);





 

-- -- SELECT column_name(s)
-- FROM table1
-- INNER JOIN table2
-- -- ON table1.column_name = table2.column_name;

