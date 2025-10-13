import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useQuery } from '@tanstack/react-query';
import api from '@/instance/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // Custom styles for the calendar

// Setup the localizer by providing the moment Object
// to the correct localizer.
moment.locale('pt-br');
console.log('Current moment locale:', moment.locale());
const localizer = momentLocalizer(moment);

interface Appointment {
  id: number;
  date: string;
  time: string;
  client: {
    name: string;
  };
  service: {
    name: string;
    duration: number;
  };
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await api.get('/agendamentos');
      return res.data;
    },
  });

  useEffect(() => {
    if (appointments) {
      const formattedEvents = appointments.map((appointment) => {
        const start = moment(`${appointment.date} ${appointment.time}`).toDate();
        const end = moment(start).add(appointment.service.duration, 'minutes').toDate();
        return {
          title: `${appointment.client.name} - ${appointment.service.name}`,
          start,
          end,
          allDay: false,
        };
      });
      setEvents(formattedEvents);
    }
  }, [appointments]);

  if (isLoading) {
    return <div className="text-center p-10 text-soft-text">Carregando agendamentos...</div>;
  }

  const EventComponent = ({ event }: { event: any }) => {
    return (
      <div className="text-xs h-full overflow-hidden">
        <strong className="font-bold">{moment(event.start).format('HH:mm')}</strong>
        <p className="whitespace-normal">{event.title}</p>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-10rem)]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        culture='pt-br'
        components={{
          event: EventComponent,
        }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          allDay: "Dia todo",
          showMore: total => `+${total} mais`,
        }}
      />
    </div>
  );
};

export default CalendarPage;