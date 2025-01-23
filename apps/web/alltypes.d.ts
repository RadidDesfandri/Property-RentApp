// declare module 'react-awesome-calendar';

declare module 'react-awesome-calendar' {
    import { ComponentType } from 'react';
    export interface CalendarEvent {
      id: number;
      color: string;
      from: string;
      to: string;
      title: string;
    }
  
    export interface AwesomeCalendarProps {
      events: CalendarEvent[];
    }
  
    const AwesomeCalendar: ComponentType<AwesomeCalendarProps>;
  
    export default AwesomeCalendar;
  }