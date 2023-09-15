export interface EmailMessage {
  sender: User;
  to: User[];
  subject: string;
  htmlContent?: string;
}

export enum MailType {
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED',
  SCHEDULED = 'SCHEDULED',
}

export interface User {
  name: string;
  email: string;
}
