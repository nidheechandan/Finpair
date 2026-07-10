const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'neo4j+s://d9670df3.databases.neo4j.io',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'd9670df3',
    process.env.NEO4J_PASSWORD || 'aVLC8u6G7Z7rER93-duUk2D17ZU1bFFC0ru_O9iKI0o'
  )
);

async function initDB() {
  const session = driver.session();
  try {
    await session.run(`
      MERGE (b1:Bookkeeper {id: '1', name: 'Priya Sharma', specialty: 'GST Filing', rate: '800', rating: '4.9', location: 'Chennai'})
      MERGE (b2:Bookkeeper {id: '2', name: 'Arjun Mehta', specialty: 'Reconciliation', rate: '600', rating: '4.8', location: 'Coimbatore'})
      MERGE (b3:Bookkeeper {id: '3', name: 'Sunita Yadav', specialty: 'Payroll', rate: '550', rating: '4.7', location: 'Bangalore'})
    `);
    console.log('Database initialized with bookkeepers!');
  } finally {
    await session.close();
  }
}

app.get('/bookkeepers', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (b:Bookkeeper) RETURN b');
    const bookkeepers = result.records.map(r => r.get('b').properties);
    res.json(bookkeepers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

app.post('/jobs', async (req, res) => {
  const { title, budget, description } = req.body;
  const session = driver.session();
  try {
    const result = await session.run(
      'CREATE (j:Job {id: randomUUID(), title: $title, budget: $budget, description: $description, status: "open", createdAt: datetime()}) RETURN j',
      { title, budget, description }
    );
    const job = result.records[0].get('j').properties;
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

app.get('/jobs', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (j:Job) RETURN j ORDER BY j.createdAt DESC');
    const jobs = result.records.map(r => r.get('j').properties);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

app.post('/bids', async (req, res) => {
  const { jobId, bookkeeperName, amount, note } = req.body;
  const session = driver.session();
  try {
    const result = await session.run(
      'CREATE (bid:Bid {id: randomUUID(), jobId: $jobId, bookkeeperName: $bookkeeperName, amount: $amount, note: $note, createdAt: datetime()}) RETURN bid',
      { jobId, bookkeeperName, amount, note }
    );
    const bid = result.records[0].get('bid').properties;
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'FreelanceBooks API running', neo4j: 'connected' });
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log('FreelanceBooks backend running on port ' + PORT);
  await initDB();
});