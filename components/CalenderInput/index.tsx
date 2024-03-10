interface CalendarInputProps {
  // takes a date value and a function that sets the state in the parent component
  date: string;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  date,
  handleDateChange,
}) => {
  // Implement your component logic here

  return (
    // JSX code for your component's UI
    <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center '>
      {/* <Image src={Calender} width={24} height={24} alt='calendar' /> */}
      <input
        type='date'
        name='date'
        value={date}
        onChange={handleDateChange}
        className='text-sm font-medium bg-transparent focus:outline-none'
      />
    </label>
  );
};

export default CalendarInput;
