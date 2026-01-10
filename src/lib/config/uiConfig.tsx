'use client';

import React, { createContext, useContext } from 'react';

export type PageSizes = {
  verses: number;
  events: number;
  relations: number;
};

export type EntityPanelAnimation = {
  duration: number;
  stiffness: number;
  damping: number;
  backdropClosable: boolean;
};

export type UIConfig = {
  // General
  chipsOnly: boolean;
  deepLinksEnabled: boolean;
  showDistribution: boolean;
  showCoMentions: boolean;

  // Optional visuals
  mapPreviewEnabled: boolean;
  ageAtEventEnabled: boolean;

  // Page sizes
  pageSizes: PageSizes;

  // Entity panel animation
  entityPanelAnimation: EntityPanelAnimation;
};

export const defaultUIConfig: UIConfig = {
  chipsOnly: true,
  deepLinksEnabled: true,
  showDistribution: true,
  showCoMentions: true,
  mapPreviewEnabled: false,
  ageAtEventEnabled: false,
  pageSizes: {
    verses: 25,
    events: 10,
    relations: 10,
  },
  entityPanelAnimation: {
    duration: 0.25,
    stiffness: 300,
    damping: 30,
    backdropClosable: true,
  },
};

const UIConfigContext = createContext<UIConfig>(defaultUIConfig);

export function UIConfigProvider({
  value,
  children,
}: {
  value?: Partial<UIConfig>;
  children: React.ReactNode;
}) {
  const merged = { ...defaultUIConfig, ...value };
  return <UIConfigContext.Provider value={merged}>{children}</UIConfigContext.Provider>;
}

export function useUIConfig() {
  return useContext(UIConfigContext);
}
