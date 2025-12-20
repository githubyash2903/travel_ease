// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { DatabaseInitializer } from './database/DatabaseInitializer';
import publicRouter from './router/publicRouter';
import authRouter from './router/authRouter';
import userRouter from './router/userRouter';
import adminRouter from './router/adminRouter';
import { authenticate } from './middleware/auth';
import { authorize } from './middleware/authorize';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/public', publicRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticate, authorize(['USER', 'ADMIN']), userRouter);
app.use('/api/v1/admin', authenticate, authorize(['ADMIN']), adminRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.use((err: any, _req: any, res: any,) => {
  // console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

async function startServer() {
  try {
    await DatabaseInitializer.initialize();

    const PORT = Number(process.env.PORT || 4000);
    app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch {
    process.exit(1);
  }
}

startServer();
