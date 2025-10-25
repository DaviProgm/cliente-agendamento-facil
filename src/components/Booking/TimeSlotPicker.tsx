
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TimeSlotPickerProps {
  availability?: string[];
  isLoading: boolean;
  selectedSlot?: string | null;
  onSelectSlot: (slot: string) => void;
}

export const TimeSlotPicker = ({ availability, isLoading, selectedSlot, onSelectSlot }: TimeSlotPickerProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!availability || availability.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">Nenhum horário disponível para esta data.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {availability.map((slot) => (
        <Button
          key={slot}
          variant={selectedSlot === slot ? 'default' : 'outline'}
          onClick={() => onSelectSlot(slot)}
        >
          {slot}
        </Button>
      ))}
    </div>
  );
};
