import { classNames } from "@utils/functions";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: "basic" | "positive" | "negative" | "warning" | "default";
}

export const RoundedButton: React.FC<Props> = ({
  mode = "basic",
  children,
  ...props
}) => {
  const colorSet = () => {
    switch (mode) {
      case "basic":
        return "bg-indigo-500 hover:bg-indigo-600";
      case "positive":
        return "bg-green-600 hover:bg-green-700";
      case "negative":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-800 hover:bg-gray-700";
    }
  };
  return (
    <button
      className={classNames(
        colorSet(),
        "py-2 px-4 rounded-full text-white transition-colors font-medium disabled:bg-gray-400"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
