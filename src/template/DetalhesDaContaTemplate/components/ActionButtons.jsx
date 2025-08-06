'use client';

import { Button } from '@/components/ui/button';
import React from "react";

export default function ActionButtons({
  primaryAction,
  primaryLabel = "Editar Informações",
  primaryClassName = "bg-green-500 hover:bg-green-600 min-w-44 text-white",
  secondaryAction,
  secondaryLabel = "Excluir Conta",
  secondaryClassName = "min-w-40",
  secondaryVariant = "destructive"
}) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        onClick={primaryAction}
        className={primaryClassName}
      >
        {primaryLabel}
      </Button>
      <Button
        variant={secondaryVariant}
        onClick={secondaryAction}
        className={secondaryClassName}
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}