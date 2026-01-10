'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/contexts/LanguageContext';
import { EntityPanelProvider } from '@/lib/contexts/EntityPanelContext';
import { UIConfigProvider } from '@/lib/config/uiConfig';
import { ApolloWrapper } from '@/lib/apollo/ApolloWrapper';
import { EntityPanelContainer } from '@/components/reading/EntityPanelContainer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloWrapper>
      <UIConfigProvider>
        <LanguageProvider>
          <EntityPanelProvider>
            {children}
            <EntityPanelContainer />
          </EntityPanelProvider>
        </LanguageProvider>
      </UIConfigProvider>
    </ApolloWrapper>
  );
}
