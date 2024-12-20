"use client";
import { createContext, Dispatch, JSX, SetStateAction, useState, type ReactNode } from "react";

export const ToasterContext = createContext<[Toaster[], Dispatch<SetStateAction<Toaster[]>>]>([
  [],
  () => {},
]);

type Toaster = {
  id: string;
  Components: JSX.Element;
};

export default function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toaster[]>([]);

  return (
    <ToasterContext value={[toasts, setToasts]}>
      <div className="fixed right-3 top-3 z-50 min-w-80">
        <div className="flex flex-col gap-4">
          {toasts.map((toast) => (
            <div key={toast.id}>{toast.Components}</div>
          ))}
        </div>
      </div>
      {children}
    </ToasterContext>
  );
}
