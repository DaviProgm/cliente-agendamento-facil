import React from 'react';
import { format, addDays, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface DailyEvent {
  id: string | number;
  title: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  description?: string;
  type?: 'appointment' | 'meeting' | 'blocked';
}

interface DailyCalendarProps {
  date: Date;
  events?: DailyEvent[];
  onDateChange?: (date: Date) => void;
  onTimeSlotClick?: (time: string) => void; // "HH:mm"
  onEventClick?: (event: DailyEvent) => void;
  startHour?: number;
  endHour?: number;
  intervalMinutes?: number;
}

export function DailyCalendar({
  date,
  events = [],
  onDateChange,
  onTimeSlotClick,
  onEventClick,
  startHour = 8,
  endHour = 18,
  intervalMinutes = 30,
}: DailyCalendarProps) {

  function generateTimeSlots() {
    const slots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let min = 0; min < 60; min += intervalMinutes) {
        if (hour === endHour && min > 0) break;
        slots.push(`${hour.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`);
      }
    }
    return slots;
  }

  function isTimeOccupied(time: string) {
    return events.some(ev => ev.startTime <= time && time < ev.endTime);
  }

  function isPast(time: string) {
    const now = new Date();
    const dt = new Date(date);
    const [h, m] = time.split(':').map(Number);
    dt.setHours(h, m, 0, 0);
    return dt < now;
  }

  function handlePrevDay() {
    if(onDateChange) onDateChange(addDays(date, -1));
  }

  function handleNextDay() {
    if(onDateChange) onDateChange(addDays(date, 1));
  }

  function handleToday() {
    if(onDateChange) onDateChange(new Date());
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      {/* Header com navegação */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevDay} className="btn btn-outline">‹</button>
        <div>
          <h2 className="text-xl font-semibold">{format(date, "EEEE, dd 'de' MMMM yyyy", { locale: ptBR })}</h2>
          <button onClick={handleToday} disabled={isToday(date)} className="text-sm text-blue-600 underline mt-1">Hoje</button>
        </div>
        <button onClick={handleNextDay} className="btn btn-outline">›</button>
      </div>

      {/* Slots de horário */}
      <div className="space-y-2">
        {timeSlots.map(time => {
          const occupiedEvent = events.find(ev => ev.startTime <= time && time < ev.endTime);
          const past = isPast(time);
          return (
            <div
              key={time}
              className={`flex items-center p-3 rounded-md border ${
                occupiedEvent ? 'bg-red-100 cursor-pointer' : past ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-100 cursor-pointer hover:bg-green-200'
              }`}
              onClick={() => {
                if (!occupiedEvent && !past) onTimeSlotClick?.(time);
              }}
            >
              <div className="w-16 font-mono">{time}</div>
              <div className="flex-1 ml-4">
                {occupiedEvent ? (
                  <div onClick={() => onEventClick?.(occupiedEvent)} className="font-semibold text-red-700">
                    {occupiedEvent.title}
                    {occupiedEvent.description && <p className="text-sm text-red-600">{occupiedEvent.description}</p>}
                  </div>
                ) : (
                  <span className="text-green-700 font-medium">Disponível</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
