import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import api from "@/instance/api";
import { DailyCalendar, DailyEvent } from "../DailyCalendar/Calendar";
import { format } from "date-fns";

// Define Client interface
interface Client {
  id: number;
  name: string;
  email?: string;
}

// Update Schedule interface
interface Schedule {
  id: number;
  client: Client; // Add client object
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
        const { data } = await api.get<Schedule[]>(
          `/agendamentos?provider=${providerId}`
        );

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
            // Combine service and client name for the title
            title: `${schedule.service.name} - ${schedule.client.name}`,
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
  }, [providerId, selectedDate]);

  return (
    <div>
      <DailyCalendar
        date={selectedDate}
        onDateChange={setSelectedDate}
        events={events}
        isLoading={loading}
        onTimeSlotClick={(time) => console.log("Slot clicado:", time)}
        onEventClick={(event) => console.log("Evento clicado:", event)}
      />
    </div>
  );
}
