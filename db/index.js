const connection = require('./connection.js');

class companyDb {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
      "FROM employee " +
      "LEFT JOIN role ON employee.role_id = role.id " +
      "LEFT JOIN department on role.dept_id = department.id " +
      "LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    );
  };

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT departments.id, departments.name FROM departments;"
    );
  };

  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, role.salary, role.dept_id departments.dept_name FROM role;" +
      "LEFT JOIN departments ON role.dept_id = departments.id"
    );
  };

  createEmployees(employee) {
    return this.connection.promise().query(
      "INSERT INTO employee (name) VALUES (?)", employee.name);
  };  

  createRole(role) {
    return this.connection.promise().query(
      "INSERT INTO role (title) VALUES (?)", role.title);
  };

  createDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO departments (dept_name) VALUES (?)", department.dept_name);
  };

  updateRole(empId, roleId) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id= ? WHERE employee.id = ?", roleId, empId
    );
  };
};

module.exports = new companyDb(connection);
