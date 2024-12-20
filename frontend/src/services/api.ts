// src/services/api.ts
import ky from 'ky';
import { RsvpData, ApiResponse } from '@/libs/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async submitRsvp(data: RsvpData): Promise<ApiResponse<RsvpData>> {
    try {
      const response = await ky.post(`${API_URL}/rsvp`, { json: data }).json<ApiResponse<RsvpData>>();
      return response;
    } catch {
      throw new Error('Failed to submit RSVP');
    }
  },

  async getGuestList(): Promise<ApiResponse<RsvpData[]>> {
    try {
      const response = await ky.get(`${API_URL}/guests`).json<ApiResponse<RsvpData[]>>();
      return response;
    } catch {
      throw new Error('Failed to fetch guest list');
    }
  }
};