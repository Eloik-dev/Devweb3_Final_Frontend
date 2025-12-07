import { useAuth } from "@/context/AuthContext";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function Portfolio() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600">Chargement du portfolio...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Veuillez vous connecter pour voir votre portfolio</p>
      </div>
    );
  }

  const userStocks = user.stocks || [];

  if (userStocks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Vous n'avez aucun stock dans votre portfolio</p>
        <p className="text-sm text-gray-400 mt-2">Visitez la page d'accueil pour acheter vos premiers stocks!</p>
      </div>
    );
  }

  // Regrouper les stocks par _id (stock ID, pas achat ID)
  const groupedStocks = userStocks.reduce((acc, stock) => {
    const stockId = stock._id;

    if (!stockId) return acc; // Skip invalid stocks

    if (acc[stockId]) {
      // Stock existe déjà, additionner la quantité
      acc[stockId].quantity += stock.quantity;
      acc[stockId].totalValue += (stock.unitPrice || 0) * stock.quantity;
    } else {
      // Nouveau stock
      acc[stockId] = {
        ...stock,
        quantity: stock.quantity,
        totalValue: (stock.unitPrice || 0) * stock.quantity,
      };
    }

    return acc;
  }, {} as Record<string, (typeof userStocks)[0] & { totalValue: number }>);

  const stocksArray = Object.values(groupedStocks);

  // Calculer la valeur totale du portfolio
  const totalValue = stocksArray.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalActions = stocksArray.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div>
      {/* Résumé du portfolio */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-1">Valeur totale du portfolio</p>
          <p className="text-4xl font-bold text-green-600 mb-2">${totalValue.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            {stocksArray.length} action{stocksArray.length > 1 ? "s" : ""} différente{stocksArray.length > 1 ? "s" : ""} • {totalActions} actions totales
          </p>
        </CardContent>
      </Card>

      {/* Liste des stocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocksArray.map((stock) => (
          <Card key={stock._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{stock.stockShortName || "N/A"}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{stock.stockName || "Nom indisponible"}</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  ×{stock.quantity}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">${stock.unitPrice?.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/ action</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-lg">${stock.totalValue.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 ml-auto">valeur totale</span>
                </div>

                {stock.buyAt && <p className="text-xs text-gray-400 pt-2 border-t">Premier achat: {new Date(stock.buyAt).toLocaleDateString("fr-FR")}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
