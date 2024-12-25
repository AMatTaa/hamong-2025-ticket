// src/services/api.ts
import ky from 'ky';
import { RsvpData, ApiResponse } from '@/libs/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async submitRsvp(data: RsvpData): Promise<ApiResponse<RsvpData>> {
    try {
      const response = await ky.post(`${API_URL}/send_rsvp`, { json: data }).json<ApiResponse<RsvpData>>();
      return response;
    } catch(error) {
      throw new Error(`no can do! ${error}`);
    }
  },
};