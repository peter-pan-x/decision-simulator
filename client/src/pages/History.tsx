import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History as HistoryIcon, Trash2, ChevronRight, Search, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

interface HistoryItem {
  id: string;
  question: string;
  timestamp: number;
  recommendation: string;
  confidence: number;
}

export default function History() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('decision_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('decision_history', JSON.stringify(newHistory));
  };

  const filteredHistory = history.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <HistoryIcon className="h-8 w-8 text-primary" />
            Decision History
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and manage your past strategic analyses
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">New Analysis</Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search past decisions..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {item.confidence}% Confidence
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.question}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 italic">
                      Recommendation: {item.recommendation}
                    </p>
                  </div>
                  <div className="flex flex-col border-l">
                    <Button 
                      variant="ghost" 
                      className="flex-1 rounded-none px-4 hover:bg-destructive/10 hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteItem(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Link href={`/analysis/${item.id}`}>
                      <Button variant="ghost" className="flex-1 rounded-none px-4 border-t">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <HistoryIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No history found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {searchTerm ? "No decisions match your search criteria." : "You haven't performed any strategic analyses yet."}
            </p>
            {!searchTerm && (
              <Link href="/">
                <Button className="mt-6">Start Your First Analysis</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
