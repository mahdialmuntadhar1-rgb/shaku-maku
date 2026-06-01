import React from 'react';

type State = {
  hasError: boolean;
  message: string;
};

type Props = {
  children: React.ReactNode;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message || 'Unknown error',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111] text-white flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/15 bg-[#1a1a1a] p-6">
            <h1 className="text-2xl font-black mb-2">Shaku Maku</h1>
            <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-zinc-300 break-words">{this.state.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 px-4 py-2 rounded-lg bg-[#c8a95f] text-black font-bold"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
