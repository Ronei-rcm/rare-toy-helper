
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro na aplicação:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="max-w-lg border border-red-200 bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <h2 className="text-lg font-medium text-red-800">Ops! Algo deu errado</h2>
            </div>
            <div className="mt-2">
              <p className="text-sm text-red-700 mb-4">{this.state.error?.message}</p>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
