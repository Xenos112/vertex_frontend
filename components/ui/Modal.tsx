"use client";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import React, { ReactNode, useState, type ComponentProps, createContext, Ref } from "react";

const ModalVisualContext = createContext<[boolean, (isOpen: boolean) => void]>([false, () => {}]);

export function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return <ModalVisualContext value={[isOpen, setIsOpen]}>{children}</ModalVisualContext>;
}

export function ModalHeader({ ...props }: ComponentProps<"div">) {
  return <div {...props} />;
}

export function ModalBody({ ...props }: ComponentProps<"div">) {
  return <div {...props} />;
}

export function ModalCloseButton({ children }: { children: ReactNode }) {
  const [_isOpen, setIsOpen] = React.useContext(ModalVisualContext);

  const clickHandler = () => {
    setIsOpen(false);
  };
  return <button onClick={clickHandler}>{children}</button>;
}

export function ToggleButton({ ...props }: ComponentProps<"button">) {
  const [isOpen, setIsOpen] = React.useContext(ModalVisualContext);
  return (
    <button
      {...props}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    />
  );
}

export function ModalContent({ ...props }: ComponentProps<"div">) {
  const [isOpen, setIsOpen] = React.useContext(ModalVisualContext);
  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  return isOpen ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
      <div
        {...props}
        ref={ref as Ref<HTMLDivElement | null>}
        className="w-full max-w-md p-4 text-center"
      />
    </div>
  ) : null;
}
