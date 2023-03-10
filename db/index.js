const connection = require('./connection.js');

class companyDb {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, departments.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
      "FROM employee " +
      "LEFT JOIN role ON employee.role_id = role.id " +
      "LEFT JOIN departments on role.dept_id = departments.id " +
      "LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    );
  };

  findAllManagers() {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role " +
        "FROM employee " +
        "LEFT JOIN role ON employee.role_id = role.id " +
        "WHERE manager_id IS NULL;"
        );
  };

  findEmployeeByManager(managerId) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, departments.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
        "FROM employee " +
        "LEFT JOIN role ON employee.role_id = role.id " +
        "LEFT JOIN departments on role.dept_id = departments.id " +
        "LEFT JOIN employee manager ON manager.id = employee.manager_id " +
        "WHERE employee.manager_id = (?);", managerId.manager
      );
  };

  findEmployeeByDepartment(deptId) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, departments.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
        "FROM employee " +
        "LEFT JOIN role ON employee.role_id = role.id " +
        "LEFT JOIN departments on role.dept_id = departments.id " +
        "LEFT JOIN employee manager ON manager.id = employee.manager_id " +
        "WHERE role.dept_id = (?);", deptId.department)
  };

  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT departments.id, departments.dept_name FROM departments;"
    );
  };

  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, role.salary, departments.dept_name AS departments FROM role " +
      "LEFT JOIN departments ON role.dept_id = departments.id"
    );
  };

  createEmployee(employee) {
    return this.connection.promise().query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [employee.first_name, employee.last_name, employee.role_id, employee.manager]);
  };  

  createRole(role) {
    return this.connection.promise().query(
      "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)", [role.title, role.salary, role.dept_id]);
  };

  createDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO departments (dept_name) VALUES (?)", department.dept_name);
  };

  updateRole(empId, roleId) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id= (?) WHERE employee.id = (?)", [roleId, empId]);
  };

  updateManager(empId, managerId) {
    return this.connection.promise().query(
        "UPDATE employee SET manager_id= (?) WHERE employee.id = (?)", [managerId, empId]);
  };

  deleteEmployee(empId) {
    return this.connection.promise().query(
        "DELETE FROM employee WHERE employee.id = (?)", empId);
  };

  deleteDepartment(deptId) {
    return this.connection.promise().query(
        "DELETE FROM departments WHERE departments.id = (?)", deptId);
  };

  deleteRole(roleId) {
    return this.connection.promise().query(
        "DELETE FROM role WHERE id = (?)", roleId);
  };

  viewBudgetReport() {
    return this.connection.promise().query(
    "SELECT departments.dept_name AS department, SUM(role.salary) AS used_budget " +
    "FROM employee " +
    "LEFT JOIN role ON employee.role_id = role.id " +
    "LEFT JOIN departments on role.dept_id = departments.id " +
    "LEFT JOIN employee manager ON manager.id = employee.manager_id " +
    "GROUP BY departments.dept_name;"
  )}
};

module.exports = new companyDb(connection);
