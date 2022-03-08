import { useWorkspace } from "@hooks/useWorkspace";

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");
