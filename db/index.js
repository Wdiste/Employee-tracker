const connection = require('./connection.js');

class companyDb {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
      "FROM employee " +
      "LEFT JOIN role ON employee.role_id = role.id " +
      "LEFT JOIN course on role.dept_id = department.id " +
      "LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    );
  };

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT departments.id, departments.name FROM departments;"
    );
  };

  createEmployee(employee) {
    return this.connection.promise().query(
      "INSERT INTO employee (name) VALUES (?)", employee.name);
  };  

  updateRole(empId, roleId) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id= ? WHERE employee.id = ?", roleId, empId
    )
  }

  findAllRoles() {
    return this.connection.promise().query(
      "SELECT roles.id, roles.title, roles.salary, roles.dept_id departments.dept_name FROM roles;" +
      "LEFT JOIN departments ON roles.dept_id = departments.id"
    );
  };
  createRole(role) {
    return this.connection.promise().query(
      "INSERT INTO role (title) VALUES (?)", role.title);
  };

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT departments.id, departments.name FROM departments;"
    );
  };

  createDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO department (dept_name) VALUES (?)", department.dept_name);
  };

};

module.exports = new companyDb(connection);
