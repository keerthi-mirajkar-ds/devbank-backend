const assert = require("node:assert/strict");
const { once } = require("node:events");
const test = require("node:test");

const { createApp } = require("../src/app");

async function withServer(run) {
  const server = createApp().listen(0);
  await once(server, "listening");

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("health endpoint reports service status", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: "ok",
      service: "devbank-backend",
    });
  });
});

test("summary endpoint returns customer account data", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/summary`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.customer, "Ava Johnson");
    assert.equal(body.accounts.length, 2);
    assert.equal(body.transactions.length, 3);
    assert.equal(body.totalBalance, 23820.55);
  });
});

