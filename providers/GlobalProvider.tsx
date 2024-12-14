import ThemeProviderWrapper from "./ThemeProvider";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProviderWrapper>{children}</ThemeProviderWrapper>;
}
