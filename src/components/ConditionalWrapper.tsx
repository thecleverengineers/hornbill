import { useVisibility } from '@/hooks/useVisibility';

interface ConditionalWrapperProps {
  componentId: string;
  children: React.ReactNode;
}

export function ConditionalWrapper({ componentId, children }: ConditionalWrapperProps) {
  const { isVisible } = useVisibility();
  
  if (!isVisible(componentId)) return null;
  
  return <>{children}</>;
}