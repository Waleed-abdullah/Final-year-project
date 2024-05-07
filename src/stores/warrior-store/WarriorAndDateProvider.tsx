'use client';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

interface WarriorAndDateContextType {
  warriorID: string;
  name: string;
  date: string;
  caloricGoal: number;
  weightGoal: number;
  warriorProfilePic: string;
  setWarriorProfilePic: (profilePic: string) => void;
  setWeightGoal: (weightGoal: number) => void;
  setCaloricGoal: (caloricGoal: number) => void;
  setDate: (date: string) => void;
}

export const WarriorAndDateContext = createContext<
  WarriorAndDateContextType | undefined
>(undefined);

export function useWarriorAndDate() {
  const context = useContext(WarriorAndDateContext);
  if (context === undefined) {
    throw new Error('useWarrior must be used within a WarriorProvider');
  }
  return context;
}

export const WarriorAndDateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const currentdate = new Date();
  const dateString = currentdate.toISOString().split('T')[0];

  const [warriorID, setWarriorID] = useState<string>('');
  const [date, setDate] = useState<string>(dateString.toString());
  const [caloricGoal, setCaloricGoal] = useState<number>(1500);
  const [weightGoal, setWeightGoal] = useState<number>(0);
  const [warriorProfilePic, setWarriorProfilePic] = useState<string>('');
  const [name, setName] = useState<string>('');

  const session = useSession();

  useEffect(() => {
    if (!session.data) return;

    const fetchWarrior = async () => {
      const response = await fetch(
        `http://localhost:3000/api/waza_warrior/?user_id=${session.data.user.user_id}`,
      );
      if (!response.ok) {
        // Handle error
        console.error('Failed to fetch warrior information');
        return;
      }
      const data = await response.json();
      console.log('Warrior data:', data);
      setWarriorID(data.warrior_id);
      setCaloricGoal(data.caloric_goal);
      setName(data.users.name);
      setWeightGoal(data.weight_goal);
      setWarriorProfilePic(data.users.profile_pic);
    };

    fetchWarrior();
  }, [session]);

  return (
    <WarriorAndDateContext.Provider
      value={{
        warriorID,
        date,
        caloricGoal,
        setCaloricGoal,
        setDate,
        name,
        weightGoal,
        setWeightGoal,
        warriorProfilePic,
        setWarriorProfilePic,
      }}
    >
      {children}
    </WarriorAndDateContext.Provider>
  );
};
