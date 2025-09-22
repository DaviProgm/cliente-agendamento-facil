import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import api from "@/instance/api";
import { DailyCalendar, DailyEvent } from "../DailyCalendar/Calendar";
import { format } from "date-fns";

interface Schedule {
  id: number;
  name: string;
  service: {
    id: number;
    name: string;
    duration: number;
    price: string;
  };
  date: string;
  time: string;
  observations?: string;
  status?: string;
}

interface CreditorProfileProps {
  providerId: number;
  providerName?: string;
  providerEmail?: string;
}
export default function CreditorProfile({ providerId, providerName, providerEmail }: CreditorProfileProps) {
  const [events, setEvents] = useState<DailyEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

 useEffect(() => {
  async function fetchSchedules() {
    setLoading(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");

      // Busca todos os agendamentos do provider (sem filtro por data)
      const { data } = await api.get<Schedule[]>(
        `/agendamentos?provider=${providerId}`
      );

      // Filtro manual por data no front-end
      const filteredData = data.filter((s) => s.date === dateStr);

      const transformed = filteredData.map((schedule) => {
        const startTime = schedule.time;
        const [hour, minute] = startTime.split(":").map(Number);
        const endHour = hour + 1;
        const endTime = `${endHour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        return {
          id: schedule.id.toString(),
          title: schedule.service.name,
          startTime,
          endTime,
          description: schedule.observations,
          type: schedule.status === "confirmed" ? "appointment" : "meeting",
        };
      });

      setEvents(transformed);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchSchedules();
}, [providerId, selectedDate]);// busca dados quando a data mudar

  return (
    <div>
      <DailyCalendar
        date={selectedDate}
        onDateChange={setSelectedDate}
        events={events}
        onTimeSlotClick={(time) => console.log("Slot clicado:", time)}
        onEventClick={(event) => console.log("Evento clicado:", event)}
      />
    </div>
  );
}


