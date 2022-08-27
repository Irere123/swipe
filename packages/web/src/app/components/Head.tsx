import React from "react";

interface HeadProps {
  title?: string;
}
export const Head: React.FC<HeadProps> = ({ title }) => {
  if (title) {
    document.title = `${title} | Swipe`;
  } else {
    document.title = "Swipe - Meet";
  }
  return null;
};
