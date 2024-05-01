'use client';
import { Template } from '@/types/app/(private)/(drawer-routes)/workout';
import { DialogClose } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';

export const CreateTemplate = ({
  session_id,
  setTemplates,
}: {
  session_id: string;
  setTemplates: Dispatch<SetStateAction<Template[]>>;
}) => {
  // State to manage input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    session_id: session_id,
  });

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/api/waza_warrior/template',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to create template');
      }
      const newTemplate = await response.json();
      console.log('================newTemplate============');
      console.log(newTemplate);
      setTemplates((prevState) => [...prevState, newTemplate]);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-md p-4 flex flex-col gap-4 '
    >
      <div className='flex flex-col gap-2'>
        <input
          name='title'
          value={formData.title}
          onChange={handleChange}
          className=' py-1 px-4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'
          placeholder='Title'
        />
        <input
          name='description'
          value={formData.description}
          onChange={handleChange}
          className=' py-1 px-4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'
          placeholder='Description'
        />
      </div>

      <DialogClose
        type='submit'
        className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center justify-center cursor-pointer'
      >
        Create Template
      </DialogClose>
    </form>
  );
};
