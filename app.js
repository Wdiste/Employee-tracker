const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

startTracker();

function startTracker() {
  console.log('beginning startTracker');
  const logoTitle = logo({ name: "Employee Tracker" }).render();

  console.log(logoTitle);
  trackerMenu();
}

async function trackerMenu() {
  console.log('beginning trackerMenu');

  await prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option from the menu:",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Exit",
          value: "EXIT",
        },
      ],
    },
  ]).then(async (result) => {
    let selection = await result.choice;

    switch (selection) {
      case "VIEW_EMPLOYEES":
        await viewEmployees();
        break;
      case "VIEW_DEPARTMENTS":
        await viewDepartments();
        break;
      case "VIEW_ROLES":
        await viewRoles();
        break;
      case "ADD_EMPLOYEE":
        await addEmployee();
        break;
      case "UPDATE_ROLE":
        await updateEmployeeRole();
        break;
      case "ADD_DEPARTMENT":
        await addDepartment();
        break;
      case "ADD_ROLE":
        await addRole();
        break;
      default:
        console.log('Exiting tracker... have a nice day!');
        return process.exit('success');
    }
  });
};


function addDepartment(){
    prompt([
        {
          name: "dept_name",
          message: "What is the name of the new department?"
        }
      ])
        .then(res => {
          let department = res;
          db.createDepartment(department)
            .then(() => console.log(`Added ${department.dept_name} to the database`))
            .then(() => promptExampleQuestions())
        })
};

function addEmployee(){
    prompt([
        {
          name: "name",
          message: "What is the name of the new employee?"
        }
      ])
        .then(res => {
          let employee = res;
          db.createEmployee(employee)
            .then(() => console.log(`Added ${employee.name} to the database`))
            .then(() => promptExampleQuestions())
        })
};

function addRole(){
    prompt([
        {
          name: "title",
          message: "What is the name of the new role?"
        }
      ])
        .then(res => {
          let role = res;
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => promptExampleQuestions())
        })
};

function viewDepartments(){
    db.findAllDepartments()
    .then((dbResults) => {
      console.log("db results: ", dbResults);
      const [rows] = dbResults;
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startTracker());
};

function viewEmployees(){
    db.findAllEmployees()
    .then((dbResults) => {
      console.log("db results: ", dbResults);
      const [rows] = dbResults;
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startTracker());
};

function viewRoles(){
    db.findAllRoles()
    .then((dbResults) => {
      console.log("db results: ", dbResults);
      const [rows] = dbResults;
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startTracker());
};

function updateEmployeeRole(){
    db.findAllEmployees()
    .then(employees => prompt([
        {
          type: "list",
          name: "empId",
          message: "What is the name of the employee whose role you wish to update?",
          choices: employees.map(employee => {
            return {
              name: (employee.first_name + employee.last_name),
              value: employee.id
            };
          })
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the new role you wish to assign?",
          choices: [employees.map(employee => {
            return {
                name: employee.role,
                value: employee.role_id
            };
          })]
        }
      ])
        .then(res => {
          let role = res;
          db.updateRole(role)
            .then(() => console.log(`Added ${role.new_title} to the database`))
            .then(() => promptExampleQuestions())
        }))
};