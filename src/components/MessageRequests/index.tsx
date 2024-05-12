'use client';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { pusherClient } from '@/lib/messages/pusher';
import { IncomingMessageRequest } from '@/types/pusher';
import Image from 'next/image';

interface MessageRequestsProps {
  incomingMessageRequests: IncomingMessageRequest[];
  session_id: string;
}

const MessageRequests: FC<MessageRequestsProps> = ({
  incomingMessageRequests,
  session_id,
}) => {
  const router = useRouter();
  const [messageRequests, setMessageRequests] = useState<
    IncomingMessageRequest[]
  >(incomingMessageRequests);

  useEffect(() => {
    const channel = pusherClient.subscribe(session_id);

    channel.bind('msg-request', (data: IncomingMessageRequest) => {
      setMessageRequests((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe(session_id);
      pusherClient.unbind('msg-request', (data: IncomingMessageRequest) => {
        setMessageRequests((prev) => [...prev, data]);
      });
    };
  }, [session_id]);

  const acceptMessageRequest = async (sender_id: string) => {
    await axios.post('/api/message/accept', { sender_id });
    setMessageRequests((prev) =>
      prev.filter((request) => request.user_id !== sender_id),
    );
    router.refresh();
  };

  const denyMessageRequest = async (sender_id: string) => {
    await axios.post('/api/message/deny', { sender_id });
    setMessageRequests((prev) =>
      prev.filter((request) => request.user_id !== sender_id),
    );
    router.refresh();
  };
  return (
    <>
      {messageRequests.length === 0 ? (
        <p>No message requests</p>
      ) : (
        messageRequests.map((request) => {
          return (
            <div
              key={request.user_id}
              className='max-w-[266px]  w-full h-full max-h-[334px] rounded-xl bg-white flex flex-col justify-center items-center gap-3 p-2'
            >
              <Image
                src={request.profile_pic || 'https://via.placeholder.com/150'}
                alt={request.username}
                className='rounded-full'
                width={50}
                height={50}
              />
              <p className='font-bold text-lg'>
                {request.name || 'placeholder'}
              </p>
              <div className='flex flex-row justify-between w-3/4'>
                <button
                  className='flex items-center justify-center rounded-md p-2 font-medium bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-500 text-center'
                  onClick={() => {
                    acceptMessageRequest(request.user_id);
                  }}
                >
                  Accept
                </button>
                <button
                  className='flex items-center justify-center rounded-md p-2 font-medium bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-red-300 transition-all duration-500 text-center'
                  onClick={() => {
                    denyMessageRequest(request.user_id);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default MessageRequests;
