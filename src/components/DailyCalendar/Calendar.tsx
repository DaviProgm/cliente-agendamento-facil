import React from 'react';
import { format, addDays, isToday, isSameHour, isSameMinute } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, CalendarCheck, Ban } from 'lucide-react';

export interface DailyEvent {
  id: string | number;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  type?: 'appointment' | 'meeting' | 'blocked';
}

interface DailyCalendarProps {
  date: Date;
  events?: DailyEvent[];
  onDateChange?: (date: Date) => void;
  onTimeSlotClick?: (time: string) => void;
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
        slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  }

  function isPast(time: string) {
    const now = new Date();
    const dt = new Date(date);
    const [h, m] = time.split(':').map(Number);
    dt.setHours(h, m, 0, 0);
    return dt < now;
  }

  function isNow(time: string) {
    const now = new Date();
    const slot = new Date(date);
    const [h, m] = time.split(':').map(Number);
    slot.setHours(h, m, 0, 0);
    return (
      isSameHour(now, slot) && Math.abs(now.getMinutes() - slot.getMinutes()) <= intervalMinutes / 2
    );
  }

  const badgeColor = (type?: string) => {
    switch (type) {
      case 'appointment': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header com navegação */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow border mb-6 flex items-center justify-between">
        <button onClick={() => onDateChange?.(addDays(date, -1))} className="text-gray-600 hover:text-black px-3 py-1 border rounded-lg">‹</button>
        <div className="text-center">
          <h2 className="text-xl font-bold">{format(date, "EEEE, dd 'de' MMMM yyyy", { locale: ptBR })}</h2>
          <button
            onClick={() => onDateChange?.(new Date())}
            disabled={isToday(date)}
            className="text-sm text-indigo-600 underline disabled:text-gray-400"
          >
            Hoje
          </button>
        </div>
        <button onClick={() => onDateChange?.(addDays(date, 1))} className="text-gray-600 hover:text-black px-3 py-1 border rounded-lg">›</button>
      </div>

      {/* Calendário em card */}
      <div className="space-y-4">
        {timeSlots.map((time) => {
          const event = events.find((ev) => ev.startTime <= time && time < ev.endTime);
          const past = isPast(time);
          const now = isNow(time);
          const isClickable = !event && !past;

          return (
            <div
              key={time}
              onClick={() => isClickable && onTimeSlotClick?.(time)}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all shadow-sm ${
                event
                  ? 'bg-red-50 hover:bg-red-100 cursor-pointer'
                  : past
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-green-50 cursor-pointer'
              } ${now ? 'ring-2 ring-green-400' : ''}`}
            >
              <div className="w-20 font-mono text-sm flex items-center gap-1">
                <Clock size={14} /> {time}
              </div>
              <div className="flex-1">
                {event ? (
                  <div onClick={() => onEventClick?.(event)}>
                    <p className="font-semibold text-red-700">{event.title}</p>
                    {event.description && (
                      <p className="text-sm text-red-600">{event.description}</p>
                    )}
                  </div>
                ) : past ? (
                  <span className="text-gray-400 italic">Tempo expirado</span>
                ) : (
                  <span className="text-green-700 font-medium">Disponível</span>
                )}
              </div>
              {event ? (
                <span className={`text-xs px-2 py-1 rounded-full ${badgeColor(event.type)}`}>
                  {event.type === 'appointment' && <CalendarCheck size={14} className="inline mr-1" />}
                  {event.type === 'blocked' && <Ban size={14} className="inline mr-1" />}
                  {event.type || 'Ocupado'}
                </span>
              ) : !past ? (
                <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  Livre
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
