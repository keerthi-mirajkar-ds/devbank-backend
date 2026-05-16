const { createApp } = require("./app");

const port = Number(process.env.PORT || 3001);
const app = createApp();

app.listen(port, () => {
  console.log(`devbank-backend listening on port ${port}`);
});

