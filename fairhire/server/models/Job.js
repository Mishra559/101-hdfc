// In-memory Job model helper.
class Job {
  constructor({ id, title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Job;
