export interface Log {
  id: string;
  message: string;
  level: 'Info' | 'Warning' | 'Error';
  createdAt: Date;
}
