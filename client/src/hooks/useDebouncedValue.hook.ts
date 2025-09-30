import { useEffect, useRef, useState } from "react";

// TODO: Importa los hooks necesarios de React (useState, useEffect)

// TODO: Crea un custom hook llamado useDebouncedValue
// - Debe recibir un value y un delay (por defecto 300ms)
// - Debe mantener un estado local con el valor
// - Usar useEffect para:
//   - Iniciar un timeout que actualice el estado después del delay
//   - Limpiar el timeout en cada render
// - Retornar el valor debounced

/**
 * A custom hook that debounces a value, delaying updates until after a specified time
 * has elapsed without further changes. Useful for optimizing performance when dealing
 * with rapidly changing values like search inputs or resize events.
 *
 * @template T - The type of the value being debounced
 * @param {T} value - The value to debounce
 * @param {number} [delay=300] - The debounce delay in milliseconds (0-10000ms)
 * @param {(value: T) => void} [onDebounceChange] - Optional callback function that executes when the debounced value changes
 * @returns {T} The debounced value
 */
export const useDebouncedValue = <T>(
  value: T,
  delay: number = 300,
  onDebounceChange?: (value: T) => void
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    if (delay <= 0) {
      setDebouncedValue(value);
      return;
    }
    const validDelay = Math.max(0, Math.min(delay, 10000));

    const handler = setTimeout(() => {
      if (value !== previousValueRef.current) {
        setDebouncedValue(value);
        previousValueRef.current = value;
        onDebounceChange?.(value);
      }
    }, validDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onDebounceChange]);

  return debouncedValue;
};
