'use client';

import { Message } from '@/types/pusher';
import { pusherClient } from '@/lib/messages/pusher';
import { ChatPartner } from '@/types/chat';
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

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
            <div
              className={`flex  ${
                message.sender_id === session_id
                  ? 'flex-row'
                  : 'flex-row-reverse'
              } items-center`}
            >
              <div
                className={`${
                  message.sender_id === session_id
                    ? 'bg-white ml-auto text-right mr-4'
                    : 'bg-yellow-500 mr-auto ml-4'
                } w-1/2 rounded-lg p-2 mt-4`}
              >
                <p>{message.message_content}</p>
                <p>{formatTimestamp(message.timestamp)}</p>
              </div>

              {message.sender_id !== session_id && (
                <div>
                  <Image
                    src={
                      chatPartner.profile_pic || 'https://www.robohash.org/123'
                    }
                    alt='chatPartner'
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Messages;
