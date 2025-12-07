import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span className="font-semibold text-gray-900">StockManager</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} StockManager. Tous droits réservés.</p>

          {/* Links */}
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
