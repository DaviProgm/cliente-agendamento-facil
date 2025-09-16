import React, { useState, useEffect } from 'react';
import { format, addDays, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, PlusCircle } from 'lucide-react';

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
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  function getEventForSlot(time: string) {
    return events.find((ev) => ev.startTime <= time && time < ev.endTime);
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-card rounded-2xl shadow-lg border border-border">
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex items-center justify-between">
        <button onClick={() => onDateChange?.(addDays(date, -1))} className="text-muted-foreground hover:text-foreground px-3 py-1 border rounded-lg shadow-sm">‹</button>
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {format(date, "EEEE, dd 'de' MMMM yyyy", { locale: ptBR })}
          </h2>
          <button
            onClick={() => onDateChange?.(new Date())}
            disabled={isToday(date)}
            className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            Hoje
          </button>
        </div>
        <button onClick={() => onDateChange?.(addDays(date, 1))} className="text-muted-foreground hover:text-foreground px-3 py-1 border rounded-lg shadow-sm">›</button>
      </div>

      <div className="relative">
        {isToday(date) && (
          <div
            className="absolute left-12 right-0 h-0.5 bg-destructive z-10"
            style={{
              top: `${((now.getHours() - startHour) * 60 + now.getMinutes()) / ((endHour - startHour) * 60) * 100}%`,
            }}
          ></div>
        )}

        <div className="grid grid-cols-[auto_1fr] gap-x-4">
          {timeSlots.map((time) => {
            const event = getEventForSlot(time);
            const isPast = new Date(`${format(date, 'yyyy-MM-dd')}T${time}`) < now;
            const slotKey = `${format(date, 'yyyy-MM-dd')}-${time}`;

            return (
              <div key={slotKey}>
                <div className="text-right text-sm text-muted-foreground pr-2 pt-3 font-mono">
                  {time}
                </div>
                <div
                  onClick={() => !event && !isPast && onTimeSlotClick?.(time)}
                  className={`border-l-2 pl-4 py-3 relative ${
                    event
                      ? 'border-destructive'
                      : isPast
                      ? 'border-border'
                      : 'border-secondary hover:border-primary'
                  }`}
                >
                  {event && (
                    <div
                      onClick={() => onEventClick?.(event)}
                      className="bg-destructive/10 p-3 rounded-lg cursor-pointer hover:bg-destructive/20 transition-colors"
                    >
                      <p className="font-semibold text-destructive-foreground">{event.title}</p>
                      {event.description && (
                        <p className="text-sm text-destructive-foreground/80">{event.description}</p>
                      )}
                      <div className="text-xs text-destructive-foreground/70 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  )}

                  {!event && isPast && (
                    <div className="text-muted-foreground italic text-sm">Tempo expirado</div>
                  )}

                  {!event && !isPast && (
                    <div className="text-secondary font-medium text-sm cursor-pointer flex items-center">
                      <PlusCircle size={14} className="mr-2" />
                      Disponível
                    </div>
                  )}
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
}
