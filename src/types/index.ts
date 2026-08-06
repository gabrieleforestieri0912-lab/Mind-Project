export interface UserRow {
  id: string;
  name: string;
  email: string;
  bio: string;
  role: 'user' | 'admin';
  subscription_type: 'free' | 'standard' | 'vip';
  is_vip: boolean;
  image: string;
  mindset_level: number;
  workout_progress: number;
  challenge_logs: Record<string, unknown>;
  created_at: string;
}

export type SafeUser = UserRow;

export interface ContactRow {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

export interface NextApiRequestWithBody<T = unknown> extends Omit<import('next').NextApiRequest, 'body'> {
  body: T;
}


