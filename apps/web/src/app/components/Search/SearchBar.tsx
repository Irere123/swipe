import { JSX, Component } from "solid-js";
import { SolidSearch } from "../icons";
import { Input } from "../Input";

export interface SearchBarProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  mobile?: boolean;
  isLoading?: boolean;
}

export const SearchBar: Component<SearchBarProps> = ({
  inputClassName = "",
  isLoading = false,
  mobile = false,
  ...props
}) => {
  return (
    <div
      class={`items-center flex w-full bg-[#f6f6f6] text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg ${
        mobile ? "px-6" : ""
      } ${props.class}`}
    >
      {!mobile && (
        <div class="h-full mx-4 flex items-center pointer-events-none">
          <SolidSearch />
        </div>
      )}
      <Input
        autofocus
        data-testid="searchbar"
        class={`${inputClassName} pl-0`}
        {...props}
      />
      {isLoading && (
        <div
          class={`h-full flex items-center pointer-events-none ${
            !mobile && "mx-4"
          }`}
        >
          loading..
        </div>
      )}
    </div>
  );
};
