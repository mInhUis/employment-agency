import { pool} from '../db/db.js';

export async function createJob(job) {
    const {
        title, description, location, salary
    } = job; 
    const employer_id = job.employer_id;

  const [result] = await pool.query(
    `INSERT INTO jobs (title, description, location, salary, employer_id)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, location, salary, employer_id]
  );

  return result.insertId;
}

export async function getAllJobs() {
    const [rows] = await pool.query('SELECT * FROM jobs');
    return rows;
}

export async function getJobById(id) {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    return rows[0];
}

export async function updateJob(id, job ) {
    const {
        name, description, location, salary 
    } = job;
    const [result] = await pool.query(
        'UPDATE jobs SET title = ?, description = ?, location = ?, salary = ? WHERE id = ?',
        [name, description, location, salary, id]
    );
}

export async function deleteJob(id) {
  await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
}