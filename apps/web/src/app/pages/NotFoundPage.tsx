import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const { replace } = useHistory();
  useEffect(() => {
    replace("/");
  }, [replace]);
  return null;
};

export default NotFoundPage;
