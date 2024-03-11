import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import AddFriendsDialog from './AddFriendsDialog';
const AddFriends = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className='w-full h-[50px] p-2 flex gap-1 justify-center items-center bg-transparent hover:bg-yellow-400 text-black hover:text-white border border-gray-300  hover:border-transparent  font-bold py-2 px-4 rounded-full'>
            <Plus size={24} className=' ml-7' />
            <div className=' mr-7'>Add Friends</div>
          </button>
        </DialogTrigger>
        <DialogContent>
          <AddFriendsDialog />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFriends;
