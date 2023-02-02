use company_db;


INSERT INTO departments (dept_name)
VALUES
    ('Customer service'),
    ('Front end'),
    ('Grocery'),
    ('Frozen'),
    ('deli');

INSERT INTO role
    (title, salary, dept_id)
VALUES
    ('Front End Supervisor', 26, 2),
    ('Cashier', 14, 2),
    ('Grocery Supervisor', 25, 3),
    ('Grocery Clerk', 16, 3),
    ('Customer Service Rep', 18, 1),
    ('Frozen Supervisor', 27, 4),
    ('Frozen Clerk', 16, 4),
    ('Deli Supervisor', 22, 5),
    ('Deli Clerk', 16, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Peter', 'Crouch', 1, NULL),
    ('Wayne', 'Rooney', 2, 1),
    ('Alex', 'Furgeson', 2, 1),
    ('Seamus', 'Coleman', 3, NULL),
    ('David', 'Villa', 4, 4),
    ('Kevin', 'De Bruyne', 5, 1),
    ('Alan', 'Shearer', 5, 1),
    ('Manuel', 'Rui Costa', 2, 1),
    ('Clarence', 'Seedorf', 6, NULL),
    ('Ji Song', 'Park', 7, 9),
    ('Luca', 'Modric', 8, NULL),
    ('Alfredo', 'DiStefano', 9, 11),
    ('Robin', 'Van Persie', 9, 11),
    ('Didier', 'Drogba', 2, 1);