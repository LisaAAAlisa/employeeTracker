var mysql = require("mysql");
var inquirer = require("inquirer");
var consTable = require("console.table");
var figlet = require("figlet");




const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "*batYA5kombat$",
    database: "employee_trackerdb",
});
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // figlet("EMPLOYEE  \n       MANAGER", function (err, data) {
    //     if (err) {
    //         console.log("Something went wrong...");
    //         console.dir(err);
    //         return;
    //     }
    //     console.log(data);
    // });
    initInquiry();
});

function initInquiry() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",

                "Add employee",
                "Add role",
                "Add department",

                "Remove employee",
                "Update employee role",

                // "Delete employee",
                // "Delete department",
                // "Delete role",

                "exit"
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewEmp();
                    break;
                case "View all departments":
                    viewDept();
                    break;
                case "View all roles":
                    viewRole();
                    break;
                case "Add employee":
                    addEmp();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add department":
                    addDept();
                    break;
                case "Remove employee":
                    removeEmp();
                    break;
                case "Update emoloyee role":
                    updatetRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewEmp() {
    var query = "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name, CONCAT(m.first_name, ' ', m.last_name) as manager FROM  employee AS e    LEFT JOIN employee AS m ON e.manager_id = m.id    JOIN role AS r ON e.role_id = r.id    JOIN department AS d on d.id = r.department_id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initInquiry();
    });
}
function viewDept() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initInquiry();
    });
}
function viewRole() {
    connection.query("SELECT * FROM role;", function (err, res) {
        if (err) throw err;
        console.table(res);
        initInquiry();
    });
};

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Department name?',
            name: 'deptName'
        }
    ]).then((response) => {
        const deptName = response.deptName;
        const qry = "INSERT INTO department SET ?";
        connection.query(qry, { name: deptName }, function (err) {
            if (err) throw err;
            initInquiry();
        });
    });
}
function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employee first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employee last name:',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'Employee role:',
            name: 'empRole',
            choices: [
                "Salesman",
                "Marketing Specialist",
                "Lead Engineer",
                "Engineer",
                "Accountant"
            ]
        },
        {
            type: 'list',
            message: 'Employee manager:',
            name: 'empManager',
            choices: [
                "Hanan Yusuf",
            ]
        },
    ]).then((response) => {

        const qry = "INSERT INTO employee  (first_name, last_name, role_id, manager_id) " +
            "values ('" + response.firstName + "','" + response.lastName + "', " +
            "(select id from role where title = '" + response.empRole + "'), " +
            "(select id from employee m where CONCAT(m.first_name, ' ', m.last_name) = '" + response.empManager + "'))";
        connection.query(qry, function (err) {
            if (err) throw err;
            initInquiry();
        });
    });
}
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Add new employee role:',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the role salary?',
            name: 'newSalary'
        },
        {
            type: 'list',
            message: 'What is the name of the department?',
            name: 'department',
            choices: [
                "Sales",
                "Marketing",
                "Engineering",
                "Accounting"
            ]
        }
    ]).then((response) => {

        const qry = "insert into role (title, salary, department_id) " +
            "values ('" + response.newRole + "'," + response.newSalary + ", " +
            "(select id from department where name = '" + response.department + "'))";
        connection.query(qry, function (err) {
            if (err) throw err;
            initInquiry();
        });
    });
}












// function addDept() {
//     inquirer.prompt([
//         {
//             name: "name",
//             type: "input",
//             message: "What Department would you like to add?"
//         }
//         ]).then((answers) => {
//         connection.query("INSERT INTO department SET ? ",
//         {
//             name: answers.name
//         },
//         (err) => {
//         if (err) throw err

//         }
//             )
//             handleNewDept();
//         })
//     }
//     function handleNewDept() {
//         connection.query("SELECT * FROM department", (err, res) =>{
//             var dataArr = res
//             departmentArray = []
//             for(i=0; i< dataArr.length; i++){
//                 departmentArray.push(dataArr[i].name)
//             }
//             // console.log(departmentArray)
//         })
//     }
// function addEmp() {
//     inquirer
//         .prompt([
//             {
//                 name: "firstname",
//                 type: "input",
//                 message: "Enter first name: ",
//             },
//             {
//                 name: "lastname",
//                 type: "input",
//                 message: "Enter last name name: ",
//             },
//             {
//                 name: "emprole",
//                 type: "list",
//                 message: "Enter employee role: ",
//             },
//             {
//                 name: "managerid",
//                 type: "list",
//                 message: "Enter managerid: ",
//             },
//         ])
//         .then(function (answer) {
//             connection.query("INSERT INTO employee SET ? ", {
//                 (err) => {
//                 if (err) throw err 
//                 }
//             }
//             });
// }
//         addEmp();
