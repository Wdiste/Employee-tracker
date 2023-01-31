const express = require("express");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

startTracker();

function startTracker() {
  const logoTitle = logo({ name: "Employee Tracker" }).render();

  console.log(logoTitle);
  trackerMenu();
}

function trackerMenu() {
  prompt([
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
  ]).then((result) => {
    let selection = res.choice;

    switch (selection) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_ROLE":
        updateRole();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      default:
        quit();
    }
  });
};


function addDepartment(){};
function addEmployee(){};
function addRole(){};
function viewDepartments(){};
function viewEmployees(){};
function viewRoles(){};
function updateRole(){};
