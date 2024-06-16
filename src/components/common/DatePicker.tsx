import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"; // CSS 파일 임포트
import getCurrentDateFormatted from "../../utill/getCurrentDateFormatted";
import { AiOutlineCalendar } from "react-icons/ai";
import useWindowWidth from "../../hooks/useWindowWidth";
import styled from "styled-components";

interface FutureDatePickerProps {
  daysOffset: number;
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FutureDatePicker({
  daysOffset,
  setIsDateSelected,
}: FutureDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const windowWidth = useWindowWidth();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsDateSelected(true);
  };

  const calculateMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + daysOffset);
    return today;
  };

  return (
    <DatePickerCon>
      <DataPickerIcon>
        <AiOutlineCalendar />
      </DataPickerIcon>
      <DatePicker
        wrapperClassName="dp-full-width-wrapper"
        className="dp-full-width"
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={calculateMinDate()}
        dateFormat="yyyy-MM-dd"
        placeholderText={getCurrentDateFormatted()}
        customInput={
          <input
            style={{
              fontSize: windowWidth <= 600 ? "0.8rem" : "0.9rem",
              padding: "4px 4px 6px 4px",
            }}
          />
        }
      />
    </DatePickerCon>
  );
}

const DatePickerCon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DataPickerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: rgba(100, 100, 100, 1);
  margin-right: 8px;
`;
