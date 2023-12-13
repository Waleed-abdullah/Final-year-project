import type { NextPage } from 'next';
import Image from 'next/image';
import barbellSVG from '@/assets/Dashboard/barbell.svg';
import calenderSVG from '@/assets/Dashboard/calender.svg';
import fireSVG from '@/assets/Dashboard/fire.svg';
import goalExceededSVG from '@/assets/Dashboard/goalExceeded.svg';
import goalNotReachedSVG from '@/assets/Dashboard/goalNotReached.svg';
import goalReachedSVG from '@/assets/Dashboard/goalReacbed.svg';
import notificationSVG from '@/assets/Dashboard/notification.svg';
import plateSVG from '@/assets/Dashboard/plate.svg';
import settingsSVG from '@/assets/Dashboard/settings.svg';
import logoSVG from '@/assets/Dashboard/waza_logo.svg';

const UserDashboard: NextPage = () => {
  return (
    <div className='relative bg-color-grey-grey-50 w-full h-[1080px] overflow-hidden text-left text-5xl text-color-base-black font-desktop-text-bold-1'>
      <div className='absolute top-[0px] left-[0px] bg-color-base-black w-[300px] h-[1080px] overflow-hidden text-base text-color-base-white'>
        <Image
          fill={true}
          className='absolute top-[51px] left-[55px] w-[190px] h-[115px] overflow-hidden'
          alt=''
          src='logo.svg'
        />
        <div className='absolute top-[214px] left-[35px] rounded-3xs w-[230px] h-[60px] flex flex-row items-center justify-start py-[15px] px-5 box-border gap-[20px] text-color-yellow-yellow-300'>
          <Image
            fill={true}
            className='relative w-6 h-6'
            alt=''
            src='icon / home.svg'
          />
          <div className='relative tracking-[-0.02em] font-semibold'>
            Dashboard
          </div>
        </div>
        <div className='absolute top-[274px] left-[35px] rounded-3xs w-[230px] h-[60px] flex flex-row items-center justify-start py-[15px] px-5 box-border gap-[20px]'>
          <Image
            fill={true}
            className='relative w-6 h-6'
            alt=''
            src='icon / dumbell.svg'
          />
          <div className='relative tracking-[-0.02em] font-semibold'>
            My Workouts
          </div>
        </div>
        <div className='absolute top-[334px] left-[35px] rounded-3xs w-[230px] h-[60px] flex flex-row items-center justify-start py-[15px] px-5 box-border gap-[20px]'>
          <Image
            fill={true}
            className='relative w-6 h-6 overflow-hidden shrink-0'
            alt=''
            src='icon / apple.svg'
          />
          <div className='relative tracking-[-0.02em] font-semibold'>
            My Diet
          </div>
        </div>
        <div className='absolute top-[394px] left-[35px] rounded-3xs w-[230px] h-[60px] flex flex-row items-center justify-start py-[15px] px-5 box-border gap-[20px]'>
          <Image
            fill={true}
            className='relative w-6 h-6 overflow-hidden shrink-0'
            alt=''
            src='icon / bicep.svg'
          />
          <div className='relative tracking-[-0.02em] font-semibold'>
            Training
          </div>
        </div>
        <div className='absolute top-[454px] left-[35px] rounded-3xs w-[230px] h-[60px] flex flex-row items-center justify-start py-[15px] px-5 box-border gap-[20px]'>
          <Image
            fill={true}
            className='relative w-6 h-6'
            alt=''
            src='icon / world.svg'
          />
          <div className='relative tracking-[-0.02em] font-semibold'>
            Community
          </div>
        </div>
      </div>
      <div className='absolute top-[169px] left-[373px] text-17xl leading-[101%] font-semibold'>
        <p className='m-0'>{`Welcome Back `}</p>
        <p className='m-0'>Waleed!</p>
      </div>
      <div className='absolute top-[77px] left-[373px] leading-[101%] font-semibold opacity-[0.3]'>
        Dashboard
      </div>
      <div className='absolute top-[282px] left-[373px] rounded-3xs bg-color-base-white shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] h-80 flex flex-row items-end justify-start p-[50px] box-border gap-[49px] text-base'>
        <div className='relative w-[211.56px] h-[211.56px]'>
          <div className='absolute top-[112.51px] left-[50.78px] rounded-81xl bg-color-yellow-yellow-300 flex flex-row items-center justify-center py-2.5 px-[15px]'>
            <div className='relative leading-[101%]'>
              <b>/2500</b>
              <span>kcal</span>
            </div>
          </div>
          <div className='absolute top-[63.05px] left-[51.78px] text-[48px] leading-[101%] font-semibold'>
            1200
          </div>
          <Image
            fill={true}
            className='absolute top-[-5px] left-[-5px] w-[221.56px] h-[221.56px]'
            alt=''
            src='graph.svg'
          />
        </div>
        <div className='flex flex-col items-start justify-start gap-[10px] text-xl text-color-base-white'>
          <div className='flex flex-row items-center justify-start text-color-yellow-yellow-300'>
            <div className='rounded-81xl bg-color-base-black flex flex-row items-center justify-center py-2.5 px-[15px] gap-[10px]'>
              <Image
                fill={true}
                className='relative w-6 h-6'
                alt=''
                src='icon / fire.svg'
              />
              <div className='relative leading-[101%] font-semibold'>{`Calories Burned `}</div>
              <div className='relative leading-[101%] text-color-base-white'>
                <b>450</b>
                <span>kcal</span>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start gap-[10px]'>
            <div className='rounded-81xl bg-limegreen flex flex-row items-center justify-center py-2.5 pr-5 pl-[15px] gap-[10px]'>
              <Image
                fill={true}
                className='relative w-6 h-6'
                alt=''
                src='tag.svg'
              />
              <div className='relative leading-[101%] font-semibold'>{`Protein `}</div>
            </div>
            <div className='relative leading-[101%] text-color-base-black'>
              <b>200/1200</b>
              <span>kcal</span>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start gap-[13px]'>
            <div className='rounded-81xl bg-color-grey-grey-300 flex flex-row items-center justify-center py-2.5 pr-5 pl-[15px] gap-[10px]'>
              <Image
                fill={true}
                className='relative w-6 h-6'
                alt=''
                src='tag.svg'
              />
              <div className='relative leading-[101%] font-semibold'>Carbs</div>
            </div>
            <div className='relative leading-[101%] text-color-base-black'>
              <b>845/900</b>
              <span>kcal</span>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start gap-[8px]'>
            <div className='rounded-81xl bg-color-red-red-400 flex flex-row items-center justify-center py-2.5 pr-5 pl-[15px] gap-[10px]'>
              <Image
                fill={true}
                className='relative w-6 h-6'
                alt=''
                src='tag.svg'
              />
              <div className='relative leading-[101%] font-semibold'>Fats</div>
            </div>
            <div className='relative leading-[101%] text-color-base-black'>
              <b>1000/700</b>
              <span>kcal</span>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute top-[278px] left-[1087px] rounded-3xs bg-color-base-black shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[420px] h-36 overflow-hidden flex flex-row items-center justify-start p-[50px] box-border gap-[30px] text-color-base-white'>
        <div className='relative w-[100px] h-[42.84px]'>
          <div className='relative bg-color-yellow-yellow-300 w-[85.27px] h-[36.53px]'>
            <div className='absolute top-[39.69px] left-[19.98px] bg-color-yellow-yellow-300 w-[8.58px] h-[36.53px]' />
            <div className='absolute top-[39.69px] left-[84.05px] bg-color-yellow-yellow-300 w-[8.58px] h-[36.53px]' />
            <div className='absolute top-[39.69px] left-[7.36px] bg-color-yellow-yellow-300 w-[8.58px] h-[36.53px]' />
            <div className='absolute top-[39.69px] left-[71.44px] bg-color-yellow-yellow-300 w-[8.58px] h-[36.53px]' />
            <div className='absolute top-[25.92px] left-[67.41px] bg-color-yellow-yellow-300 w-[9.01px] h-[34.81px] [transform:_rotate(-90deg)] [transform-origin:0_0]' />
          </div>
        </div>
        <div className='relative leading-[101%] font-semibold'>Log Workout</div>
      </div>
      <div className='absolute top-[450px] left-[1087px] rounded-3xs bg-color-base-white shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[420px] h-36 overflow-hidden flex flex-row items-center justify-start p-[50px] box-border gap-[30px]'>
        <Image
          fill={true}
          className='relative w-[100px] h-[56.49px]'
          alt=''
          src='icon.svg'
        />
        <div className='relative leading-[101%] font-semibold'>Log Diet</div>
      </div>
      <div className='absolute top-[458px] left-[1087px] rounded-3xs bg-color-base-white shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[420px] h-36 overflow-hidden flex flex-row items-center justify-start p-[50px] box-border gap-[30px]'>
        <Image
          fill={true}
          className='relative w-[100px] h-[56.49px]'
          alt=''
          src='icon.svg'
        />
        <div className='relative leading-[101%] font-semibold'>Log Diet</div>
      </div>
      <div className='absolute top-[638px] left-[1087px] rounded-3xs bg-color-base-white shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[420px] h-[402px] overflow-hidden flex flex-row items-center justify-center p-[50px] box-border text-center text-17xl'>
        <div className='relative leading-[101%] font-semibold inline-block w-[301.39px] shrink-0'>
          Trainer Marketplace
        </div>
      </div>
      <div className='absolute top-[638px] left-[373px] rounded-3xs bg-color-base-white shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[679px] h-[402px] overflow-hidden' />
      <div className='absolute top-[0px] left-[1557px] bg-color-base-white w-[363px] h-[1080px] overflow-hidden' />
      <div className='absolute top-[0px] left-[1557px] bg-color-base-white w-[363px] h-[1080px] overflow-hidden text-xl text-black'>
        <div className='absolute top-[190px] left-[31px] flex flex-col items-start justify-start gap-[10px]'>
          <div className='relative rounded-3xs shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-20 overflow-hidden shrink-0'>
            <div className='absolute top-[20px] left-[5.5px] w-[30px] h-[30px] hidden' />
            <div className='absolute top-[30px] left-[32px] leading-[101%] font-semibold'>
              Leaderboard
            </div>
            <div className='absolute top-[20px] left-[189.2px] rounded-81xl bg-color-base-black w-[100px] flex flex-row items-center justify-center py-2.5 px-5 box-border text-color-yellow-yellow-300'>
              <div className='relative leading-[101%] font-semibold'>Dec</div>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start gap-[20px]'>
            <div className='relative rounded-3xs bg-color-yellow-yellow-300 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px]'>
              <Image
                fill={true}
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Waleed
              </div>
              <div className='absolute top-[25px] left-[252.13px] leading-[101%] font-semibold text-right'>
                100
              </div>
            </div>
            <div className='relative rounded-3xs bg-color-red-red-400 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px] text-color-base-white'>
              <Image
                fill={true}
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Ali Tariq
              </div>
              <div className='absolute top-[25px] left-[260.13px] leading-[101%] font-semibold text-right'>
                89
              </div>
            </div>
            <div className='relative rounded-3xs bg-color-grey-grey-400 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px] text-color-base-white'>
              <Image
                fill={true}
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Talha
              </div>
              <div className='absolute top-[25px] left-[262.13px] leading-[101%] font-semibold text-right'>
                78
              </div>
            </div>
            <div className='relative rounded-3xs bg-color-grey-grey-100 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px]'>
              <Image
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Nouman
              </div>
              <div className='absolute top-[25px] left-[260.13px] leading-[101%] font-semibold text-right'>
                60
              </div>
            </div>
            <div className='relative rounded-3xs bg-color-grey-grey-100 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px]'>
              <Image
                fill={true}
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Ali Raza
              </div>
              <div className='absolute top-[25px] left-[260.13px] leading-[101%] font-semibold text-right'>
                55
              </div>
            </div>
            <div className='relative rounded-3xs bg-color-grey-grey-100 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.03)] w-[310px] h-[70px]'>
              <Image
                fill={true}
                className='absolute top-[10px] left-[19.37px] rounded-[50%] w-[50px] h-[50px] object-cover'
                alt=''
                src='Ellipse 15.png'
              />
              <div className='absolute top-[25px] left-[84.37px] leading-[101%]'>
                Ahmed Faraz
              </div>
              <div className='absolute top-[25px] left-[261.13px] leading-[101%] font-semibold text-right'>
                25
              </div>
            </div>
          </div>
        </div>
        <div className='absolute top-[40px] left-[calc(50%_-_160px)] rounded-81xl box-border w-80 flex flex-row items-center justify-end p-2.5 gap-[13px] text-right text-base border-[1px] border-solid border-color-grey-grey-100'>
          <div className='relative leading-[101%] font-semibold z-[0]'>
            <p className='m-0'>{`Waleed `}</p>
            <p className='m-0'>Abdullah</p>
          </div>
          <Image
            fill={true}
            className='relative rounded-[50%] w-[70px] h-[70px] object-cover z-[1]'
            alt=''
            src='dp.png'
          />
          <Image
            fill={true}
            className='absolute my-0 mx-[!important] top-[30px] left-[32.5px] w-[30px] h-[30px] z-[2]'
            alt=''
            src='icon / settings.svg'
          />
          <Image
            fill={true}
            className='absolute my-0 mx-[!important] top-[30px] left-[75.5px] w-[30px] h-[30px] overflow-hidden shrink-0 z-[3]'
            alt=''
            src='icon / notification-2.svg'
          />
        </div>
        <Image
          fill={true}
          className='absolute top-[159.5px] left-[calc(50%_-_160px)] w-80 h-px'
          alt=''
          src='Vector 2.svg'
        />
        <div className='absolute top-[970px] left-[31px] rounded-81xl shadow-[0px_10px_10px_rgba(0,_0,_0,_0.05)] box-border w-[310px] h-[70px] overflow-hidden flex flex-row items-center justify-center py-1.5 px-20 gap-[13px] text-color-base-black border-[1px] border-solid border-color-grey-grey-200'>
          <Image
            fill={true}
            className='relative w-[30px] h-[30px] overflow-hidden shrink-0'
            alt=''
            src='icon / add.svg'
          />
          <div className='relative leading-[101%] font-semibold'>
            Add Friends
          </div>
        </div>
      </div>
      <div className='absolute top-[42px] left-[1140px] rounded-81xl shadow-[0px_10px_10px_rgba(0,_0,_0,_0.05)] box-border h-[90px] overflow-hidden flex flex-row items-center justify-center py-1.5 px-10 gap-[15px] text-xl text-black border-[1px] border-solid border-color-grey-grey-200'>
        <Image
          fill={true}
          className='relative w-[30px] h-[30px] overflow-hidden shrink-0'
          alt=''
          src=''
        />
        <div className='relative leading-[101%] font-semibold'>
          Sept 23, 2023 | Saturday
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
