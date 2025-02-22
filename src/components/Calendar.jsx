import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import api from '../utils/api'
import './Calendar.css'
const Calendar = () => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  const handleDatesSet = async data => {
    const response = await api.get(
      '/events/getevents?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
    )
    try {
      setEvents(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <section>
      <div style={{ position: 'relative', zIndex: 0 }} className="calendar-container">
        <FullCalendar
          locale="pt-br"
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          displayEventTime="true"
          displayEventEnd="true"
          datesSet={date => handleDatesSet(date)}
          customButtons={{
            addevent: {
              text: 'Adicionar evento',
              click: function () {
                navigate('/events/new')
              }
            }
          }}
          headerToolbar={{
            left: 'addevent',
            center: 'title',
            right: 'today prev,next'
          }}
          buttonText={{
            today: 'Hoje'
          }}
        />
      </div>
    </section>
  )
}

export default Calendar
