export interface IDefaultRequest {
  title: string;
  category: string;
  description: string;
  dueDateTime: string;
  status: 'CREATED' | 'PENDING_APPROVAL' | 'APPROVED' | 'COMPLETED';
  otherCategory?: string;
  chats?: Array<unknown>;
  user: string;
  resolver?: string;
  tempResolvers?: Array<unknown>;
  files?: Array<unknown>;
}
