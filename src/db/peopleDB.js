const connection = require('./connection');

const insert = (person) => connection.execute(
  `INSERT INTO people
    (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
    [person.firstName, person.lastName, person.email, person.phone],
);

const findAll = () => connection.execute('SELECT * FROM people');

const findById = (id) => connection.execute('SELECT * FROM people WHERE id = ?', [id]);

module.exports = {
  insert,
  findAll,
  findById,
};
