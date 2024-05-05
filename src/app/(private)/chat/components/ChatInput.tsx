'use client';

import axios from 'axios';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import Send from '@/assets/chats/send.svg';
interface ChatInputProps {
  chatPartner: {
    user_id: string;
    username: string;
    profile_pic: string | null;
    name: string | null;
  };
  chat_id: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chat_id }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post('/api/message/send', { text: input, chat_id });
      setInput('');
      textareaRef.current?.focus();
    } catch {
      console.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
        <textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              //   sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className='py-2'
          aria-hidden='true'
        >
          <div className='py-px'>
            <div className='h-9' />
          </div>
        </div>

        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrin-0'>
            <Image onClick={sendMessage} src={Send} alt='Send' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
