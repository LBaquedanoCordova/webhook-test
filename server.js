const express = require('express');
const app = express();

app.post('/webhook', express.json({ type: 'application/json' }), (request, response) => {
  response.status(202).send('Accepted');

  const githubEvent = request.headers['x-github-event'];

  if (githubEvent === 'push') {
    const data = request.body;

    console.log(`Push event received from ${data.repository.full_name}`);
    console.log(`Ref: ${data.ref}`);
    console.log(`Pushed by: ${data.pusher.name}`);
    console.log(`Commits:`);

    data.commits.forEach((commit, index) => {
      console.log(`  ${index + 1}. ${commit.message} (by ${commit.author.name})`);
    });

  } else if (githubEvent === 'ping') {
    console.log('GitHub sent the ping event');
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
