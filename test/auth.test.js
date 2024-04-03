import register from '../routes/User';
import User from '../models/User'; // Assuming you have a User model
import { genSalt, hash } from 'bcrypt'; // Assuming you're using bcrypt for password hashing


jest.mock('../models/User', () => ({
  User: {
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));



describe('register function', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if validation fails', async () => {
   

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should create user and return 201 if validation passes', async () => {
    validateRegisterUser.mockReturnValue({ error: null });
    genSalt.mockResolvedValue('salt');
    hash.mockResolvedValue('hashedPassword');

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'User registered successfully' });
  });

  it('should return 500 if an error occurs during registration', async () => {
    validateRegisterUser.mockReturnValue({ error: null });
    genSalt.mockRejectedValue('Salt generation failed');

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'User not registered Salt generation failed' });
    expect(User.create).not.toHaveBeenCalled();
  });
});
