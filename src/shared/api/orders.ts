import { config } from "../config";

// Интерфейс для ответа PocketBase
interface PocketBaseResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

// Интерфейс для отзыва из PocketBase
export interface PocketBaseLead {
  collectionId: string;
  collectionName: string;
  id: string;
  name: string;
  phone: string;
  message: string;
  action: string;
  created: string;
  updated: string;
}

export type CreateLeadDto = Pick<
  PocketBaseLead,
  "message" | "name" | "phone" | "action"
>;

export const leadsApi = {
  // Создать заявку
  async createLead(lead: CreateLeadDto): Promise<void> {
    const response = await fetch(
      `${config.pocketbase.baseUrl}/collections/leads/records`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to create lead: ${response.status}`);
    }
  },
};
