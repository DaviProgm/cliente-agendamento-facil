import React, { useState, useEffect, useMemo } from 'react';
import { format, addDays, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, PlusCircle, Wind } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
  isLoading?: boolean;
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
  isLoading = false,
  onDateChange,
  onTimeSlotClick,
  onEventClick,
  startHour = 8,
  endHour = 18,
  intervalMinutes = 60,
}: DailyCalendarProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += intervalMinutes) {
        slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  }, [startHour, endHour, intervalMinutes]);

  const validEvents = useMemo(() => {
    return events.filter(ev => ev.startTime && ev.endTime && ev.startTime < ev.endTime);
  }, [events]);

  function getEventForSlot(time: string) {
    return validEvents.find((ev) => ev.startTime <= time && time < ev.endTime);
  }

  const renderSkeleton = () => (
    <div className="space-y-4 pt-4">
      {timeSlots.map((time) => (
        <div key={time} className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
          <Skeleton className="h-4 w-14 bg-white/5" />
          <Skeleton className="h-12 w-full bg-white/5" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-card rounded-2xl shadow-lg border">
      <div className="sticky top-0 z-20 bg-card p-4 rounded-lg mb-4 flex items-center justify-between">
        <button 
          onClick={() => onDateChange?.(addDays(date, -1))} 
          className="text-muted-foreground hover:bg-accent border rounded-lg shadow-sm px-3 py-1 transition-colors"
        >
          ‹
        </button>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
            {format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </h2>
          {!isToday(date) && (
            <button
              onClick={() => onDateChange?.(new Date())}
              className="text-base text-primary/80 hover:text-primary hover:underline"
            >
              Ir para hoje
            </button>
          )}
        </div>
        <button 
          onClick={() => onDateChange?.(addDays(date, 1))} 
          className="text-muted-foreground hover:bg-accent border rounded-lg shadow-sm px-3 py-1 transition-colors"
        >
          ›
        </button>
      </div>

      <div className="relative">
        {isToday(date) && (
          <div
            className="absolute left-20 right-0 h-0.5 bg-primary z-10"
            style={{ top: `${((now.getHours() - startHour) * 60 + now.getMinutes()) / ((endHour - startHour) * 60) * 100}%` }}
          >
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-glow"></div>
          </div>
        )}

        <div className="grid grid-cols-[auto_1fr] gap-x-4">
          {isLoading ? renderSkeleton() : (
              timeSlots.map((time) => {
                const event = getEventForSlot(time);
                const isPast = new Date(`${format(date, 'yyyy-MM-dd')}T${time}`) < now;

                return (
                  <React.Fragment key={time}>
                    <div className="text-right text-base text-muted-foreground/60 font-mono pt-3">
                      {time}
                    </div>
                    <div
                      onClick={() => !event && !isPast && onTimeSlotClick?.(time)}
                      className={`border-l-2 pl-4 py-2 relative transition-colors duration-300 ${
                        event
                          ? 'border-primary/50'
                          : isPast
                          ? 'border-border/10'
                          : 'border-border/20 hover:border-primary/80 hover:bg-accent cursor-pointer'
                      }`}
                    >
                      {event ? (
                        <div
                          onClick={() => onEventClick?.(event)}
                          className="bg-secondary p-3 rounded-lg cursor-pointer border border-primary/30 hover:bg-accent transition-colors"
                        >
                          <p className="font-semibold text-secondary-foreground text-lg">{event.title}</p>
                          {event.description && (
                            <p className="text-base text-muted-foreground">{event.description}</p>
                          )}
                          <div className="text-sm text-muted-foreground/80 mt-1 flex items-center">
                            <Clock size={12} className="inline mr-1.5" />
                            {event.startTime} - {event.endTime}
                          </div>
                        </div>
                      ) : isPast ? (
                        <div className="text-muted-foreground/40 italic text-base">--</div>
                      ) : (
                        <div className="text-muted-foreground/80 font-medium text-base flex items-center">
                          <PlusCircle size={14} className="mr-2" />
                          Disponível
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}