import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EntityIcon } from '@/components/ui/Icon';
import { EntityType } from '@/lib/utils/parseEntityMentions';

export interface EntityPanelViewProps {
  open: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  entityType: EntityType;
  entityName: string;
  summary?: string;
  closeLabel: string;
  children: React.ReactNode;
  backdropClosable?: boolean;
  animationDuration?: number;
  animationStiffness?: number;
  animationDamping?: number;
}

export function EntityPanelView({
  open,
  onClose,
  onExitComplete,
  entityType,
  entityName,
  summary,
  closeLabel,
  children,
  backdropClosable = true,
  animationDuration = 0.25,
  animationStiffness = 300,
  animationDamping = 30,
}: EntityPanelViewProps) {
  const handleBackdropClick = () => {
    if (backdropClosable) {
      onClose();
    }
  };
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {open && (
        <React.Fragment key="entity-panel">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="z-overlay fixed inset-0 bg-black/25 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="presentation"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: animationDamping,
              stiffness: animationStiffness,
              duration: animationDuration,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="entity-panel-title"
            className="z-drawer fixed top-0 right-0 isolate h-full w-full overflow-y-auto bg-white shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl dark:bg-neutral-900"
          >
            <div className="border-neutral-6 dark:border-neutral-dark-6 sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <EntityIcon type={entityType} size="md" />
                <h2
                  id="entity-panel-title"
                  className="text-neutral-12 dark:text-neutral-dark-12 text-lg font-semibold"
                >
                  {entityName}
                </h2>
              </div>
              <Button onClick={onClose} variant="ghost" size="sm" iconOnly aria-label={closeLabel}>
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-6 p-6">
              {summary && (
                <div className="text-neutral-11 dark:text-neutral-dark-11 text-sm leading-relaxed">
                  {summary}
                </div>
              )}

              {children}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
