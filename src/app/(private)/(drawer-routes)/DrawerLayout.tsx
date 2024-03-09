import RightDrawer from '@/components/RightDrawer';
import LeftDrawer from '@/components/LeftDrawer';

export function DrawerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black p-4 transition-transform duration-300 ease-in-out translate-x-0`} //  ${ isLeftDrawerOpen ? 'translate-x-0' : '-translate-x-full' }
      >
        <LeftDrawer />
      </div>

      <div
        className={`flex-1 bg-gray-200 transition-all duration-300 ease-in-out  min-h-screen ml-64 mr-64 `}
      >
        {children}
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-30 w-64 bg-white p-4 transition-transform duration-300 ease-in-out lg:block translate-x-0`} //${isRightDrawerOpen ? 'translate-x-0' : 'translate-x-full' }
      >
        <RightDrawer />
      </div>
    </div>
  );
}
