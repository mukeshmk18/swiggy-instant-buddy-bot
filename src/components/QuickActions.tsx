
import React from 'react';
import { QuickActionType, UserRole } from '@/types/chatTypes';

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
  userRole: UserRole;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction, userRole }) => {
  const customerActions: QuickActionType[] = [
    { text: 'Track Order', action: 'I want to track my order', icon: '📦' },
    { text: 'Delivery Status', action: 'Check my delivery status', icon: '🚚' },
    { text: 'Payment Status', action: 'Check my payment status', icon: '💳' },
    { text: 'Payment History', action: 'Show my payment history', icon: '📊' },
    { text: 'Check Item Stock', action: 'Check if item is available', icon: '📋' },
    { text: 'Get Invoice', action: 'I need my invoice', icon: '🧾' },
    { text: 'Business Hours', action: 'What are your business hours?', icon: '🕒' },
  ];

  const internalActions: QuickActionType[] = [
    { text: 'ERP Access', action: 'Access ERP system', icon: '💼' },
    { text: 'Admin Functions', action: 'Show admin functions', icon: '⚙️' },
    { text: 'Sales Dashboard', action: 'Open sales dashboard', icon: '📊' },
    { text: 'Customer Data', action: 'Retrieve customer data', icon: '👥' },
  ];

  const actions = userRole === 'customer' ? customerActions : internalActions;

  return (
    <div className="border-t bg-gray-50 p-3">
      <p className="text-xs text-gray-600 mb-2">Quick Actions:</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onQuickAction(action.action)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-orange-50 hover:border-orange-200 transition-colors"
          >
            <span>{action.icon}</span>
            <span>{action.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
