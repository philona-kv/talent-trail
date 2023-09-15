export interface EmailMessage {
  sender: User;
  to: User[];
  subject: string;
  htmlContent: string;
}

export interface User {
  name: string;
  email: string;
}
