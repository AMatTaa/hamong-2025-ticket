// src/services/api.ts
import ky from 'ky';
import { RsvpData, ApiResponse } from '@/libs/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async submitRsvp(data: RsvpData): Promise<ApiResponse<RsvpData>> {
    try {
      const response = await ky.post(`${API_URL}/send_rsvp`, {
        json: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
        hooks: {
          beforeRequest: [
            request => {
              console.log('Sending request:', request);
            }
          ]
        }
      }).json<ApiResponse<RsvpData>>();
      
      return response;
    } catch(error) {
      console.error('RSVP submission error:', error);
      if (error instanceof Error) {
        throw new Error(`RSVP submission failed: ${error.message}`);
      }
      throw new Error('RSVP submission failed');
    }
  },
};