/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Client } from 'pg';

// Replace this with your actual connection string
const connectionString = 'postgresql://postgres.jzspotszswymrkqyjivk:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c3BvdHN6c3d5bXJrcXlqaXZrIiwicm9zZSI6ImFub24iLCJpYXQiOjE3MTg3Mzg4MzksImV4cCI6MjAzNDMxNDgzOX0.St4lDRHAgkn5KsNPN18q-VHsI5mkAvzpWfQefDfvPhk@aws-0-eu-central-1.pooler.supabase.com:6543/postgres';

const client: Client = new Client({
  connectionString,
});

const testConnection = async () => {
  try {
    await client.connect();
    console.log('Connected successfully');
  } catch (err) {
    console.error('Connection error', err);
  } finally {
    await client.end();
  }
};

testConnection();
