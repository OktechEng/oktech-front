import * as React from "react"
import { useState, useEffect, forwardRef } from "react"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

const Textarea = forwardRef(({
  className,
  maxLength = 512,
  showCounter = true,
  value,
  onChange,
  ...props
}, ref) => {
  const [charCount, setCharCount] = useState(0);
  const [hasShownLimitToast, setHasShownLimitToast] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    // Atualizar o estado interno sempre que o value mudar (incluindo quando for resetado)
    const newValue = value || "";
    setInternalValue(newValue);
    setCharCount(newValue.length);
    
    // Reset do toast quando o campo for limpo
    if (newValue === "") {
      setHasShownLimitToast(false);
    }
  }, [value]);

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Cortar o texto se exceder o limite
    if (newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      
      // Mostrar toast quando atingir o limite
      if (!hasShownLimitToast) {
        toast.error(`Limite de ${maxLength} caracteres atingido!`, {
          toastId: "textareaLimit",
          position: "top-right",
          autoClose: 3000
        });
        setHasShownLimitToast(true);
      }
    } else {
      // Reset do toast quando sair do limite
      if (hasShownLimitToast && newValue.length < maxLength) {
        setHasShownLimitToast(false);
      }
    }
    
    setInternalValue(newValue);
    setCharCount(newValue.length);
    
    // Create a synthetic event that preserves prototype and methods
    const syntheticEvent = Object.create(e);
    syntheticEvent.target = Object.create(e.target);
    syntheticEvent.target.value = newValue;
    
    if (onChange) {
      onChange(syntheticEvent);
    }
  };

  // Determinar a cor do contador
  const getCounterColor = () => {
    const orangeThreshold = Math.floor(maxLength * 0.9);
    if (charCount >= maxLength) {
      return "text-red-500";
    } else if (charCount > orangeThreshold) {
      return "text-orange-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="relative">
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          showCounter && "pb-8",
          className
        )}
        value={internalValue}
        onChange={handleChange}
        {...props}
      />
      {showCounter && (
        <div className={cn(
          "absolute bottom-2 right-3 text-xs font-medium transition-colors duration-200",
          getCounterColor()
        )}>
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea }
