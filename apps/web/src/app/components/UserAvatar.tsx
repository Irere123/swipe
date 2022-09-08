import { Component, createSignal } from "solid-js";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "35px",
  xs: "30px",
  xxs: "20px",
};

export const onlineIndicatorStyleMap = {
  default: {
    width: "15px",
    height: "15px",
    right: "2px",
    bottom: "-4px",
    borderWidth: "4px",
  },
  lg: {
    width: "12px",
    height: "12px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  md: {
    width: "10px",
    height: "10px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  sm: {
    width: "8px",
    height: "8px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  xs: {
    width: "6px",
    height: "6px",
    right: "1px",
    bottom: "-1px",
    borderWidth: "1px",
  },
  xxs: {
    width: "4px",
    height: "4px",
    right: "0px",
    bottom: "-1px",
    borderWidth: "1px",
  },
};

export interface AvatarProps {
  src: string;
  size?: keyof typeof onlineIndicatorStyleMap;
  className?: string;
  isOnline?: boolean;
  username?: string;
}

export const UserAvatar: Component<AvatarProps> = ({
  src,
  size = "default",
  className = "",
  isOnline = false,
  username,
}) => {
  const [isError, setError] = createSignal(false);
  const sizeStyle = onlineIndicatorStyleMap[size];
  return (
    <div
      class={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
      data-testid="single-user-avatar"
    >
      <img
        alt={username ? `${username}-s-avatar` : "your-avatar"}
        class={`rounded-full w-full h-full object-cover`}
        onError={() => setError(true)}
        src={
          isError()
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username}` : "&name"
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
      />
      {isOnline && (
        <span
          class={
            "rounded-full absolute box-content bg-accent border-primary-800"
          }
          style={sizeStyle}
          data-testid="online-indictor"
        ></span>
      )}
    </div>
  );
};
