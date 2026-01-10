'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { EntityType } from '@/lib/utils/parseEntityMentions';

interface EntityPanelState {
  isOpen: boolean;
  type: EntityType | null;
  slug: string | null;
  trigger: HTMLElement | null;
}

interface EntityPanelContextValue {
  state: EntityPanelState;
  open: (type: EntityType, slug: string, trigger?: HTMLElement | null) => void;
  close: () => void;
  clearData: () => void;
}

const EntityPanelContext = createContext<EntityPanelContextValue | null>(null);

export function EntityPanelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EntityPanelState>({
    isOpen: false,
    type: null,
    slug: null,
    trigger: null,
  });

  const previousTriggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((type: EntityType, slug: string, trigger?: HTMLElement | null) => {
    previousTriggerRef.current = trigger || null;
    setState({
      isOpen: true,
      type,
      slug,
      trigger: trigger || null,
    });
  }, []);

  const close = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      trigger: null,
    }));

    if (previousTriggerRef.current) {
      setTimeout(() => {
        previousTriggerRef.current?.focus();
        previousTriggerRef.current = null;
      }, 100);
    }
  }, []);

  const clearData = useCallback(() => {
    setState(prev => ({
      ...prev,
      type: null,
      slug: null,
    }));
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  return (
    <EntityPanelContext.Provider value={{ state, open, close, clearData }}>
      {children}
    </EntityPanelContext.Provider>
  );
}

export function useEntityPanel() {
  const context = useContext(EntityPanelContext);
  if (!context) {
    throw new Error('useEntityPanel must be used within EntityPanelProvider');
  }
  return context;
}
