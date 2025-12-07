import EnvUtils from "@/utils/envUtils";

const API_URL = EnvUtils.getApiUrl();

export interface Stock {
  _id: string;
  stockName: string;
  stockShortName: string;
  quantity: number;
  unitPrice: number;
  isAvailable?: boolean;
  tags?: string[];
  buyAt?: Date;
  lastUpdatedAt?: Date;
}

export const stockApi = {
  async getAll(): Promise<Stock[]> {
    console.log("API_URL:", API_URL); // Debug log to check the API URL being used
    const response = await fetch(`${API_URL}/api/stock/all`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des stocks");
    }
    const data = await response.json();
    return data.stocks;
  },

  async getById(id: string): Promise<Stock> {
    const response = await fetch(`${API_URL}/api/stock/${id}`);
    if (!response.ok) {
      throw new Error("Stock non trouvé");
    }
    const data = await response.json();
    return data.stock;
  },
};
