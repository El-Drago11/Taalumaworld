import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content.',
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 rounded-full p-3 mb-4">
        <XCircle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

interface SuccessStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export function SuccessState({ title, message, action }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-green-50 rounded-full p-3 mb-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

interface InfoStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export function InfoState({ title, message, action }: InfoStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-blue-50 rounded-full p-3 mb-4">
        <Info className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
