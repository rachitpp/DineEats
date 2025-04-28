require('dotenv').config();
const { Client } = require('pg');
const { Sequelize } = require('sequelize');

console.log('Testing PostgreSQL connection...');
console.log('Connection string format (sanitized): postgresql://username:****@hostname:port/database');

// First try with native pg client
const testPgNative = async () => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URI,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000 // 10 seconds
  });

  try {
    console.log('\n== Testing with native pg client ==');
    console.log('Attempting to connect...');
    await client.connect();
    console.log('Connection successful!');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
    return true;
  } catch (err) {
    console.error('Native pg client connection error:', err);
    return false;
  }
};

// Then try with Sequelize
const testSequelize = async () => {
  const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 10000
    }
  });

  try {
    console.log('\n== Testing with Sequelize ==');
    console.log('Attempting to connect...');
    await sequelize.authenticate();
    console.log('Connection successful!');
    const [results] = await sequelize.query('SELECT NOW()');
    console.log('Query result:', results[0]);
    await sequelize.close();
    return true;
  } catch (err) {
    console.error('Sequelize connection error:', err);
    return false;
  }
};

// Run tests
const runTests = async () => {
  console.log('=== DATABASE CONNECTION TEST ===');
  
  const pgSuccess = await testPgNative();
  const sequelizeSuccess = await testSequelize();
  
  console.log('\n=== RESULTS ===');
  console.log('Native pg client:', pgSuccess ? 'SUCCESS' : 'FAILED');
  console.log('Sequelize:', sequelizeSuccess ? 'SUCCESS' : 'FAILED');
  
  if (!pgSuccess && !sequelizeSuccess) {
    console.log('\nSUGGESTIONS:');
    console.log('1. Verify the PostgreSQL connection string is correct');
    console.log('2. Check if the PostgreSQL server is running and accessible from your network');
    console.log('3. Ensure your firewall allows outbound connections to the PostgreSQL port');
    console.log('4. Check if the database requires a specific SSL configuration');
    console.log('5. Consider setting up a local PostgreSQL database for development');
  }
};

runTests();
