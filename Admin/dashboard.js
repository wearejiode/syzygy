
document.addEventListener("DOMContentLoaded", () => {
  const statsEl = document.getElementById("stats");

  fetch('/admin/stats')
    .then(res => res.json())
    .then(data => {
      statsEl.innerHTML = `
        <h2>Usage Stats</h2>
        <p>Total Users: ${data.users}</p>
        <p>Total Questions: ${data.totalQuestions}</p>
      `;
    })
    .catch(err => {
      statsEl.innerHTML = '<p>Error loading stats.</p>';
      console.error(err);
    });
});
