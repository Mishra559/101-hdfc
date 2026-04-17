// In-memory Candidate model helper.
class Candidate {
  constructor({ id, name, resumeText, score = null }) {
    this.id = id;
    this.name = name;
    this.resumeText = resumeText;
    this.score = score;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Candidate;
