import { ToasterContext } from "@/providers/ToasterProvider";
import React, { type MouseEventHandler, ReactNode, use, ReactElement } from "react";
import { X, Check, CircleX, Info } from "lucide-react";
import cn from "@/utils/cn";

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
    <div className="relative flex gap-4 rounded-xl bg-white p-4 dark:bg-background">
      <button
        className="absolute right-4 top-4"
        onClick={close as MouseEventHandler<HTMLButtonElement>}
      >
        <X />
      </button>
      <div>{icon as ReactNode}</div>
      <p>{text}</p>
      <span
        className="animate-fade-in absolute bottom-0 left-0 h-[3px] w-full content-['']"
        style={{
          background: background ?? "#2658fd",
        }}
      />
    </div>
  );
};

export default function useToaster() {
  const [, setToasts] = use(ToasterContext);
  use(ToasterContext);

  const open = ({ text, icon, delay }: { text: string; icon?: ReactElement; delay?: number }) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        delay={delay}
        text={text}
        icon={icon ?? <Check color="green" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), delay ?? 3000);
  };

  const close = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const error = ({ text, delay }: { text: string; delay?: number }) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={delay}
        background="red"
        icon={<CircleX color="red" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), delay ?? 3000);
  };

  const success = ({ text, delay }: { text: string; delay?: number }) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={delay}
        background="green"
        icon={<Check color="green" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), delay ?? 3000);
  };

  const info = ({ text, delay }: { text: string; delay?: number }) => {
    const id = Date.now().toString();
    const toast = (
      <Toast
        close={() => close(id)}
        text={text}
        delay={delay}
        background="blue"
        icon={<Info color="blue" />}
      />
    );

    setToasts((prev) => [{ id, Components: toast }, ...prev]);
    setTimeout(() => close(id), delay ?? 3000);
  };

  return { open, error, success, info };
}

// todo: make it responsive
