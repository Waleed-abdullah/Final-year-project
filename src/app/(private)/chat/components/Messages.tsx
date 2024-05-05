'use client';

import { Message } from '@/app/warrior/trainer-marketplace/types/pusher';
import { pusherClient } from '@/lib/messages/pusher';
import { ChatPartner } from '@/types/app/(private)/chat';
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';

interface MessagesProps {
  initialMessages: Message[];
  session_id: string;
  chatPartner: ChatPartner;
  chat_id: string;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  session_id,
  chatPartner,
  chat_id,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const formatTimestamp = (timestamp: Date) => {
    return format(timestamp, 'HH:mm');
  };

  useEffect(() => {
    pusherClient
      .subscribe(`${chat_id}`)
      .bind('new_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

    return () => {
      pusherClient.unsubscribe(`${chat_id}`);
      pusherClient.unbind('new_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    };
  }, [chat_id]);
  return (
    <div className='flex flex-col'>
      {messages.map((message, index) => {
        return (
          <div className='chat-message' key={`${message.chat_id}`}>
            <div>
              <div
                className={`${
                  message.sender_id === session_id
                    ? 'bg-white ml-auto text-right'
                    : 'bg-yellow-500 mr-auto'
                } w-1/2 rounded-lg p-2 mt-4`}
              >
                <p>{message.message_content}</p>
                <p>{formatTimestamp(message.timestamp)}</p>
              </div>

              <div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Messages;
