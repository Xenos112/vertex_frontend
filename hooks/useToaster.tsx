import { ToasterContext } from "@/providers/ToasterProvider";
import React, { type MouseEventHandler, ReactNode, use, ReactElement } from "react";
import { X, Check, CircleX, Info } from "lucide-react";


type ToastProps = {
  delay?: number;
}

const Toast = ({
  text,
  close,
  icon,
  delay,
  background,
}: {
  delay?: number;
  text: string;
  background?: string;
  close: Function;
  icon: ReactElement;
}) => {
  return (
    <div className="relative flex gap-4 rounded-xl bg-white p-4 dark:bg-background animate-appear">
      <button
        className="absolute right-4 top-4"
        onClick={close as MouseEventHandler<HTMLButtonElement>}
      >
        <X />
      </button>
      <div>{icon as ReactNode}</div>
      <p className="max-w-[80%] flex-1 truncate">{text}</p>
      <span
        className="animate-fade-in absolute bottom-0 left-0 h-[3px] w-full content-['']"
        style={{
          background: background ?? "#2658fd",
        }}
      />
    </div>
  );
};

/**
 * Hook to open a toaster with a message
 *
 *
 * @example
 * import { useToaster } from "@/hooks/useToaster";
 *
 * function MyComponent() {
 *   const toaster = useToaster();
 *
 *   return (
 *     <div>
 *       <button onClick={() => toaster.open("Hello World")}>
 *         Open Toaster
 *       </button>
 *     </div>
 *   );
 * }
 *
 * @param {text:string, { icon?: ReactElement; delay?: number }} param0
 * @returns {void}
 */

export default function useToaster() {
  const [, setToasts] = use(ToasterContext);
  use(ToasterContext);

  const open = (text: string, opts?: ToastProps & { icon: ReactElement }) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        delay={opts?.delay}
        text={text}
        icon={opts?.icon ?? <Check color="green" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), opts?.delay ?? 3000);
  };

  const close = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const error = (text: string, opts?: ToastProps) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={opts?.delay}
        background="red"
        icon={<CircleX color="red" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), opts?.delay ?? 3000);
  };

  const success = (text: string, opts?: ToastProps) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={opts?.delay}
        background="green"
        icon={<Check color="green" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), opts?.delay ?? 3000);
  };

  const info = (text: string, opts?: ToastProps) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={opts?.delay}
        background="blue"
        icon={<Info color="blue" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), opts?.delay ?? 3000);
  };

  return { open, error, success, info };
}

// TODO: make it responsive
