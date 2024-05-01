'use client';

import { Message } from '@/app/warrior/trainer-marketplace/types/pusher';
import { pusherClient } from '@/lib/messages/pusher';
import { ChatPartner } from '@/types/app/(private)/chat';
import { FC, useEffect, useState } from 'react';

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
    <div>
      {messages.map((message, index) => {
        const isCurrentUser = message.sender_id === session_id;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.sender_id === messages[index].sender_id;

        return (
          <div
            className='chat-message'
            key={`${message.chat_id}-${message.timestamp}`}
          >
            <div>
              <div>
                <span>
                  {message.message_content}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {message.timestamp.toString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Messages;
