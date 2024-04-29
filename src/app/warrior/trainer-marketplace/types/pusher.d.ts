export interface IncomingMessageRequest {
  user_id: string;
  username: string;
  profile_pic: string | null;
  name: string | null;
}

export interface Message {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message_content: string;
  timestamp: Date;
  read_status: boolean;
}
