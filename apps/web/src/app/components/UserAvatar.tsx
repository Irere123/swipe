import React, { useState } from "react";

export const avatarSizeMap = {
  default: "55px",
  lg: "45px",
  md: "40px",
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
    width: "10px",
    height: "10px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  md: {
    width: "8px",
    height: "8px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  sm: {
    width: "6px",
    height: "6px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  xs: {
    width: "4px",
    height: "4px",
    right: "1px",
    bottom: "-1px",
    borderWidth: "1px",
  },
  xxs: {
    width: "2px",
    height: "2px",
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

export const UserAvatar: React.FC<AvatarProps> = ({
  src,
  size = "default",
  className = "",
  isOnline = false,
  username,
}) => {
  const [isError, setError] = useState(false);
  const sizeStyle = onlineIndicatorStyleMap[size];
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
      data-testid="single-user-avatar"
    >
      <img
        alt={username ? `${username}-s-avatar` : "your-avatar"}
        className={`rounded-full w-full h-full object-cover`}
        onError={() => setError(true)}
        src={
          isError
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username}` : "&name"
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
      />
      {isOnline && (
        <span
          className={
            "rounded-full absolute box-content bg-accent border-primary"
          }
          style={sizeStyle}
          data-testid="online-indictor"
        ></span>
      )}
    </div>
  );
};
