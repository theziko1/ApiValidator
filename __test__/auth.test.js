import request from 'supertest';
import app from '../test-server';
import mongoose from 'mongoose';
import { config } from "dotenv";
config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

it('doit retourner un statut 200 pour la route "/"', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
});

it('doit retourner un statut 404 pour une route inexistante', async () => {
  const response = await request(app).get('/route-inexistante');
  expect(response.status).toBe(404);
});
