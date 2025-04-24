// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DateTimePicker = ({ label, value, onChange, error, name }) => {
//   // Parse value: if it's a valid date string, convert to Date; otherwise, null
//   const parsedValue =
//     value && !isNaN(new Date(value).getTime()) ? new Date(value) : null;

//   return (
//     <div className="space-y-1 mb-2">
//       {label && <label className="block text-sm text-gray-600">{label}</label>}
//       <DatePicker
//         selected={parsedValue}
//         onChange={(date) => onChange(date ? date.toISOString() : '')}
//         showTimeSelect
//         timeFormat="HH:mm"
//         timeIntervals={15}
//         dateFormat="yyyy-MM-dd HH:mm"
//         placeholderText="Select date and time"
//         className={`w-full border p-2 text-sm text-black rounded-[5px] focus:outline-none ${
//           error ? 'border-red-400' : 'border-gray-300'
//         }`}
//         name={name} // Ensure name is passed for form integration
//       />
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// };

// DateTimePicker.displayName = 'DateTimePicker';

// export default DateTimePicker;


import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css'; // Import custom CSS for datepicker theming

const DateTimePicker = ({ label, value, onChange, error, name }) => {
  // Parse value: if it's a valid date string, convert to Date; otherwise, null
  const parsedValue =
    value && !isNaN(new Date(value).getTime()) ? new Date(value) : null;

  return (
    <div className="space-y-1 mb-2">
      {label && (
        <label className="block text-sm text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <DatePicker
        selected={parsedValue}
        onChange={(date) => onChange(date ? date.toISOString() : '')}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="Select date and time"
        className={`w-full border p-2 text-sm rounded-[5px] focus:outline-none transition-colors duration-200 ${
          error
            ? 'border-red-500 dark:border-red-400 text-red-500 dark:text-red-400'
            : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700'
        } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
        name={name} // Ensure name is passed for form integration
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;