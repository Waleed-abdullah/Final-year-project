import WarriorDashboard from './(WarriorDashboard)/WarriorDashboard';
import TrainerDashboard from './(TrainerDashboard)/TrainerDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UserType } from '@/types/page/auth/user';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.user_type === UserType.WazaWarrior)
    return <WarriorDashboard />;
  else return <TrainerDashboard />;
}
