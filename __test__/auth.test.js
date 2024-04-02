import request from 'supertest';
import app from '../index.js'; 
import { genSalt, hash, validateRegisterUser, User } from '../models/User'; // Replace with the actual module paths

jest.mock('../models/User', () => ({
  genSalt: jest.fn().mockResolvedValue('mocked-salt'),
  hash: jest.fn().mockResolvedValue('mocked-hash'),
  validateRegisterUser: jest.fn(),
  User: {
    create: jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' }),
  },
}));

describe('POST /register', () => {
  it('should create a new user and respond with 201 status', async () => {
    const mockReqBody = { username: 'testuser', email: 'test@example.com', password: 'password' };
    validateRegisterUser.mockReturnValue({ error: null });

    const response = await request(app)
      .post('/register')
      .send(mockReqBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, message: 'User registered successfully' });
    expect(genSalt).toHaveBeenCalledWith(10);
    expect(hash).toHaveBeenCalledWith('password', 'mocked-salt');
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'mocked-hash',
    });
  });

  it('should respond with 400 status if validation fails', async () => {
    const mockReqBody = { username: 'testuser', email: 'test@example.com', password: 'password' };
    validateRegisterUser.mockReturnValue({ error: new Error('Validation failed') });

    const response = await request(app)
      .post('/register')
      .send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Validation failed' });
    expect(genSalt).not.toHaveBeenCalled();
    expect(hash).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });

  // Add more test cases for error handling, etc.
});