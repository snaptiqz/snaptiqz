import React from 'react';
import { Clock } from 'lucide-react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';


const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1E1E1E',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    color: '#fff',
    minHeight: '40px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2B2B2B',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    zIndex: 99,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#3B3B3B' : '#2B2B2B',
    color: '#fff',
    padding: 10,
    cursor: 'pointer',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.6)',
  }),
};

const DateTimePicker = ({
  start,
  end,
  setStart,
  setEnd,
  timeRange,
  setTimeRange,
  timezone,
  setTimezone,
  showPicker,
  setShowPicker,
  timezoneList,
}) => {
  return (
    <div className="space-y-2">
      <div
        onClick={() => setShowPicker(true)}
        className="flex items-start gap-3 p-4 rounded-xl bg-[#2B2B2B] border border-white/20 cursor-pointer hover:bg-white/10 transition"
      >
        <Clock className="text-white/70 mt-1" size={20} />
        <div className="text-sm leading-snug">
          <div className="font-medium text-white">
            {start ? new Date(start).toDateString() : "Select event date"}
          </div>
          <div className="text-white/70">
            {timeRange.start && timeRange.end
              ? `${timeRange.start} to ${timeRange.end} ${timezone}`
              : "Select time range"}
          </div>
        </div>
      </div>

      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md text-white">
            <h2 className="text-lg font-semibold mb-4">Event Time</h2>

            {/* Start Time */}
            <div className="grid grid-cols-3 items-center mb-3">
              <label className="text-sm text-white/70 col-span-1">Start</label>
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <DatePicker
                  selected={start}
                  onChange={(date) => {
                    setStart(date);
                    if (date > end) setEnd(date);
                  }}
                  dateFormat="EEE, MMM d"
                  className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
                />
                <input
                  type="time"
                  value={timeRange.start}
                  onChange={(e) =>
                    setTimeRange({ ...timeRange, start: e.target.value })
                  }
                  className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
                />
              </div>
            </div>

            {/* End Time */}
            <div className="grid grid-cols-3 items-center mb-4">
              <label className="text-sm text-white/70 col-span-1">End</label>
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <DatePicker
                  selected={end}
                  onChange={(date) => setEnd(date)}
                  dateFormat="EEE, MMM d"
                  className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
                />
                <input
                  type="time"
                  value={timeRange.end}
                  onChange={(e) =>
                    setTimeRange({ ...timeRange, end: e.target.value })
                  }
                  className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
                />
              </div>
            </div>

            {/* Timezone Dropdown */}
            <div className="mb-5">
              <label className="text-sm text-white/70 mb-1 block">Timezone</label>
              <Select
                options={timezoneList}
                value={timezoneList.find((tz) => tz.value === timezone)}
                onChange={(selected) => setTimezone(selected.value)}
                styles={customStyles}
                placeholder="Search or select timezone"
                isSearchable
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPicker(false)}
                className="bg-white text-black text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
