
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: { id: string; name: string }[];
  currentStep: string;
  completedSteps: Set<string>;
}

export const StepIndicator = ({ steps, currentStep, completedSteps }: StepIndicatorProps) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn('relative', { 'pr-8 sm:pr-20': stepIdx !== steps.length - 1 })}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className={cn('h-0.5 w-full', completedSteps.has(step.id) || currentStep === step.id ? 'bg-primary' : 'bg-border')} />
            </div>
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-background border-2 border-border transition-colors duration-300"
              style={{
                borderColor: completedSteps.has(step.id) || currentStep === step.id ? 'hsl(var(--primary))' : 'hsl(var(--border))',
              }}
            >
              {completedSteps.has(step.id) ? (
                <Check className="h-5 w-5 text-primary" aria-hidden="true" />
              ) : (
                <span className={cn('text-sm font-medium', currentStep === step.id ? 'text-primary' : 'text-muted-foreground')}>
                  {stepIdx + 1}
                </span>
              )}
            </div>
            <p className="absolute -bottom-7 w-max text-xs text-muted-foreground">{step.name}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
};
