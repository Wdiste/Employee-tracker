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
    ('Alex', 'Furgeson', 2, NULL),
    ('Seamus', 'Coleman', 3, 3),
    ('David', 'Villa', 4, NULL),
    ('Kevin', 'De Bruyne', 5, 5),
    ('Alan', 'Shearer', 5, NULL),
    ('Manuel', 'Rui Costa', 2, 7);
    ('Clarence', 'Seedorf', 6, 7);
    ('Ji Song', 'Park', 7, 7);
    ('Luca', 'Modric', 8, 7);
    ('Alfredo', 'DiStefano', 9, 7);
    ('Robin', 'Van Persie', 9, 7);
    ('Didier', 'Drogba', 2, 7);