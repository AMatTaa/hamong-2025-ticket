// src/lib/types.ts

// Interface for RSVP data
export interface RsvpData {
    phone: string;
    name: string;
    guests: number;
  }
  
  // Interface for API responses
  export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
  }