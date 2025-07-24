import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import api from "@/instance/api";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Schedule {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
  observations?: string;
  status?: string;
}

interface Event extends CalendarEvent {
  id: number;
}

interface CreditorProfileProps {
  providerId: number;
  providerName?: string;
  providerEmail?: string;
}

export default function CreditorProfile({
  providerId,
  providerName,
  providerEmail,
}: CreditorProfileProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [usedDates, setUsedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchedules() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<Schedule[]>(
          `/agendamentos?provider=${providerId}`
        );

        const evts: Event[] = data.map((schedule) => {
          const startDateTime = moment(
            `${schedule.date} ${schedule.time}`,
            "YYYY-MM-DD HH:mm"
          );
          console.log("Evento:", schedule.service, "Início:", startDateTime.format());

          return {
            id: schedule.id,
            title: schedule.service,
            start: startDateTime.toDate(),
            end: startDateTime.clone().add(1, "hour").toDate(),
            allDay: false,
          };
        });
        setEvents(evts);

        const uniqueDates = Array.from(new Set(data.map((s) => s.date)));
        setUsedDates(uniqueDates);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Falha ao carregar agendamentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSchedules();
  }, [providerId]);

  function eventStyleGetter(event: Event) {
    return {
      style: {
        backgroundColor: "#ef4444",
        borderRadius: 8,
        color: "white",
        border: "none",
        fontWeight: "600",
        padding: "4px 8px",
        cursor: "default",
        transition: "background-color 0.2s",
      },
      className: "hover:bg-red-700",
    };
  }

  function dayPropGetter(date: Date) {
    const formatted = moment(date).format("YYYY-MM-DD");
    if (usedDates.includes(formatted)) {
      return {
        style: {
          backgroundColor: "#fee2e2",
        },
      };
    }
    return {
      style: {
        backgroundColor: "#dcfce7",
      },
    };
  }

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      {loading && (
        <p className="text-center text-gray-500 text-lg">Carregando agendamentos...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
      )}

      {!loading && (
        <>
          <h1 className="text-4xl font-extrabold mb-1 text-gray-800">
            {providerName ?? `Prestador #${providerId}`}
          </h1>
          {providerEmail && <p className="mb-6 text-gray-600">{providerEmail}</p>}

          <div style={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              defaultView="day"
              views={["day"]}
              eventPropGetter={eventStyleGetter}
              dayPropGetter={dayPropGetter}
              min={new Date(1970, 1, 1, 8, 0)}   // início da grade às 08:00
              max={new Date(1970, 1, 1, 18, 0)}  // fim da grade às 18:00
              step={30}                          // passo de 30 minutos
              timeslots={2}                     // dois slots de 30min = 1h
              formats={{
                timeGutterFormat: (date) => moment(date).format("HH:mm"),
                dayFormat: (date) => moment(date).format("dddd, DD/MM"),
              }}
              selectable={false}
              popup={true}
              tooltipAccessor="title"
            />
          </div>
        </>
      )}
    </div>
  );
}
