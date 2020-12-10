# employeeTracker
# Unit 12 MySQL Homework: Employee Tracker
In this assignment I created an employee tracker that allows managers/admins to view, add, and edit various employee data using node (inquirer, ), inquirer, and MySQL.

## about

To make the program work, I designed a schema with the following criteria:
* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Afterwards, I built a command-line application that at allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

## usage

To be able to view and manage the departments, roles, and employees in a company

## guidelines
The following applications were used in addition to the ones mentioned above:

* [MySQL](https://www.npmjs.com/package/mysql) 

* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) 

* [console.table](https://www.npmjs.com/package/console.table) 


## Submission on BCS

You are required to submit the following:

* The URL of the GitHub repository

* A video demonstrating the entirety of the app's functionality 


