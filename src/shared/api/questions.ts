import { config } from '../config';

export interface Question {
  id: string;
  question: string;
  answer: string;
  created: string;
  updated: string;
}

export interface QuestionsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Question[];
}

const API_BASE_URL = config.pocketbase.baseUrl;

export const questionsApi = {
  async getQuestions(): Promise<QuestionsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/questions/records`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  async getQuestionsWithParams(
    params: {
      page?: number;
      perPage?: number;
      sort?: string;
      filter?: string;
    } = {},
  ): Promise<QuestionsResponse> {
    try {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.append('page', params.page.toString());
      if (params.perPage) searchParams.append('perPage', params.perPage.toString());
      if (params.sort) searchParams.append('sort', params.sort);
      if (params.filter) searchParams.append('filter', params.filter);

      const url = `${API_BASE_URL}/api/collections/questions/records?${searchParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching questions with params:', error);
      throw error;
    }
  },
};
