import express from 'express';
import bcrypt from 'bcrypt';

import User from './../models/user-model.js';

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    res.status(400).json({ error: 'Impossible to hash password', status: 400 });
  }

  const user = new User({
    email,
    password: hashedPassword,
  });

  const createdUser = await user.save();

  if (!createdUser) {
    res.status(400).json({ error: 'Impossible to create user', status: 400 });
  }

  res.status(201).json({ success: 'User created', status: 201 });
};
