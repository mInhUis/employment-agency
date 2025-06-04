import * as JobModel from '../models/jobModels.js';

export async function postJob(req, res) {
  const { title, description, location, salary } = req.body;
  const employer_id = req.user.id;
  const jobId = await JobModel.createJob({ title, description, location, salary, employer_id });
  res.status(201).json({ message: 'Job posted', jobId });
}

export async function getJobs(req, res) {
  const jobs = await JobModel.getAllJobs();
  res.json(jobs);
}

export async function getJob(req, res) {
  const job = await JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
}

export async function putJob(req, res) {
  const job = await JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  if (job.employer_id !== req.user.id) return res.status(403).json({ error: 'Not your job' });

  await JobModel.updateJob(req.params.id, req.body);
  res.json({ message: 'Job updated' });
}

export async function removeJob(req, res) {
  const job = await JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  if (job.employer_id !== req.user.id) return res.status(403).json({ error: 'Not your job' });
  
  await JobModel.deleteJob(req.params.id);
  res.json({ message: 'Job deleted' });
}