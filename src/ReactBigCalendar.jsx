import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// Your dummy data
const dateData = {
  "11-08-2025": [
    {"user_1": 1},
    {"user_2": 2},
    {"user_3": 3},
    {"user_4": 4},
  ],
  "12-08-2025": [
    {"user_1": 1},
    {"user_2": 2},
    {"user_3": 3},
    {"user_4": 4},
  ],
};

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    
    // Format the date to match your data format (DD-MM-YYYY)
    const formattedDate = moment(start).format("DD-MM-YYYY");
    console.log("Formatted Date:", formattedDate);
    
    // Check if there's data for this date
    const dataForDate = dateData[formattedDate];
    console.log("Data for date:", dataForDate);
    
    // Set the popup data and show popup
    setSelectedDate(formattedDate);
    setPopupData(dataForDate || null);
    setShowPopup(true);

    // REMOVED: window.prompt and event creation
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupData(null);
    setSelectedDate(null);
  };

  const renderPopupContent = () => {
    if (!popupData || popupData.length === 0) {
      return (
        <div className="popup-content">
          <h3>Date: {selectedDate}</h3>
          <p>No data available for this date.</p>
        </div>
      );
    }

    return (
      <div className="popup-content">
        <h3>Date: {selectedDate}</h3>
        <div className="user-data">
          {popupData.map((userObj, index) => {
            const userName = Object.keys(userObj)[0];
            const userValue = userObj[userName];
            return (
              <div key={index} className="user-item">
                <span className="user-name">{userName.replace('_', ' ')}</span>
                <span className="user-value">{userValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />

      {/* Custom Data Popup Modal */}
      {showPopup && (
        <>
          <div 
            className="popup-overlay" 
            onClick={closePopup}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
            }}
          />
          <div 
            className="popup-modal"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              minWidth: '320px',
              maxWidth: '500px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              zIndex: 1001,
              fontFamily: 'sans-serif',
            }}
          >
            {renderPopupContent()}
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button 
                onClick={closePopup}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .App {
          font-family: sans-serif;
          text-align: center;
        }

        .popup-content h3 {
          margin-top: 0;
          color: #333;
          border-bottom: 2px solid #007bff;
          padding-bottom: 10px;
          text-align: center;
        }

        .user-data {
          margin: 15px 0;
        }

        .user-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .user-item:last-child {
          border-bottom: none;
        }

        .user-name {
          font-weight: bold;
          color: #555;
          text-transform: capitalize;
        }

        .user-value {
          background-color: #007bff;
          color: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: bold;
          min-width: 25px;
          text-align: center;
        }

        .popup-content p {
          color: #666;
          font-style: italic;
          margin: 20px 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}