const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

startTracker();

async function startTracker() {
  const logoTitle = logo({ name: "Employee Tracker" }).render();
  console.log("dept list: ", await listDepartments());
  console.log(logoTitle);
  await trackerMenu();
}

async function trackerMenu() {
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


async function addDepartment(){
    await prompt([
        {
          name: "dept_name",
          message: "What is the name of the new department?"
        }
      ])
        .then(async res => {
          let department = res;
          await db.createDepartment(department)
            .then(() => console.log(`Added ${department.dept_name} to the database`))
            .then(() => trackerMenu())
        })
};

async function addEmployee(){
  let employeeInfo;

    await db.findAllEmployees()
    .then(async employees => {
      return await prompt([
        {
          name: "first_name",
          message: "What is the first name of the new employee?"
        },
        {
          name: "last_name",
          message: "What is the last name of the new employee?"
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role of the new employee?",
          choices: await listRoles()
        },
        {
          type: "list",
          name: "manager",
          message: "Select the employee's manager:",
          choices: await listEmployees()
    },
      ])})
        .then(res => {
          let result = res;
          console.log("result: ", result);

          let employee = {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager: res.manager
          };
          db.createEmployee(employee)
            .then(() => console.log(`Added ${employee.first_name} ${employee.last_name} to the database`))
            .then(() => trackerMenu())
        })
};

async function addRole(){
    prompt([
        {
          name: "title",
          message: "What is the name of the new role?"
        },
        {
          name: "salary",
          message: "Please enter the hourly rate for this role:"
        },
        {
          type: "list",
          name: "dept_id",
          message: "Please select a department to assign this role to:",
          choices: await listDepartments()
        }
      ])
        .then(res => {
          let role = res;
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => trackerMenu())
        })
};

function viewDepartments(){
    db.findAllDepartments()
    .then((dbResults) => {
      const [rows] = dbResults;
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => trackerMenu());
};

function viewEmployees(){
    db.findAllEmployees()
    .then((dbResults) => {
      const [rows] = dbResults;
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => trackerMenu());
};

function viewRoles(){
    db.findAllRoles()
    .then((dbResults) => {
      const [rows] = dbResults;
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => trackerMenu());
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
            .then(() => trackerMenu())
        }))
};

// begin helper functions =======================================================
// these helpers will retrieve lists of choices for inuirer prompts
async function listEmployees() {
  let list = [];

  await db.findAllEmployees()
  .then(employees => {
    list.push({name: "none", value: null});

    for(i = 0; i < employees[0].length; i++){
      const newEmp = {
        name: (employees[0][i].first_name + " " + employees[0][i].last_name),
        value: employees[0][i].id
      }
      list.push(newEmp);
     }
});

  return list;
};

async function listRoles() {
  let list = [];

  await db.findAllRoles()
  .then(roles => {
    for(i = 0; i < roles[0].length; i++){
      const newRole = {
        name: (roles[0][i].title),
        value: roles[0][i].id
      }
      list.push(newRole);
     }
});

  return list;
};

async function listDepartments() {
  let list = [];

  await db.findAllDepartments()
  .then(departments => {
    for(i = 0; i < departments[0].length; i++){
      const newRole = {
        name: (departments[0][i].dept_name),
        value: departments[0][i].id
      }
      list.push(newRole);
     }
});

  return list;
};