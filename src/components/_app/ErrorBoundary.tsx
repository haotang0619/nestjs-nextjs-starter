/* eslint-disable no-console */
import ErrorPage from 'next/error';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  error: { message: string };
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError = (error: Error) => ({
    error,
    hasError: true,
  });

  componentDidCatch = (error: Error, info: ErrorInfo) => {
    console.debug('🚀 ~ ErrorBoundary ~ error ==>', error);
    console.debug('🚀 ~ ErrorBoundary ~ info ==>', info);
  };

  constructor(props: Props) {
    super(props);

    this.state = { error: { message: '' }, hasError: false };
  }

  render() {
    const { error, hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <ErrorPage statusCode={500} title={error?.message?.replace(/\.$/, '') || 'Unknown error'} />
    ) : (
      children
    );
  }
}
