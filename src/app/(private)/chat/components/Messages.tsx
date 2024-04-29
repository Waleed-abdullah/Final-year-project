'use client';

import { Message } from '@/src/app/warrior/trainer-marketplace/types/pusher';
import { FC } from 'react';

interface MessagesProps {
  initialMessages: Message[];
  session_id: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, session_id }) => {
  return (
    <div>
      {initialMessages.map((message, index) => {
        const isCurrentUser = message.sender_id === session_id;

        const hasNextMessageFromSameUser =
          initialMessages[index - 1]?.sender_id ===
          initialMessages[index].sender_id;

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
                    {message.timestamp.toISOString()}
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
