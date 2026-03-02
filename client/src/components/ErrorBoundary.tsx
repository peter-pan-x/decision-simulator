import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, MessageSquare } from "lucide-react";
import { Component, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-background">
          <div className="flex flex-col items-center text-center w-full max-w-md p-8 rounded-2xl border bg-card shadow-xl">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle size={32} className="text-destructive" />
            </div>

            <h2 className="text-2xl font-bold mb-2">System Interruption</h2>
            <p className="text-muted-foreground mb-8">
              We encountered an unexpected neural processing error. Our engineers have been notified.
            </p>

            <div className="grid grid-cols-1 w-full gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full font-bold"
              >
                <RotateCcw size={18} className="mr-2" />
                Restart Session
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="font-semibold"
                >
                  <Home size={16} className="mr-2" />
                  Home
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/about'}
                  className="font-semibold"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Support
                </Button>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 w-full rounded-lg bg-muted text-left overflow-auto max-h-40 border">
                <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2 font-bold">Debug Trace</p>
                <pre className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">
                  {this.state.error?.message}
                  {this.state.error?.stack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
