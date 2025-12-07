const API_URL = "http://localhost:3000";

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
