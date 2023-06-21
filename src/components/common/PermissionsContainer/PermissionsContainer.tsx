import React from "react";
import { withPermissions } from "@curefit/commons-rc-rbac";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <>{children}</>;
};

Container.defaultProps = {};

export const PermissionsContainer = withPermissions(Container);
