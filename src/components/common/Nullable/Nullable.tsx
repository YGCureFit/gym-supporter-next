import React, { ReactNode } from "react";
import { _ } from "../../../utils/lodash";

type NullableProps = {
  dependencies: any;
  children: ReactNode;
  emptyRender?: ReactNode;
  loading?: boolean;
  loader?: ReactNode;
};

export const Nullable: React.FC<NullableProps> = ({
  dependencies,
  children,
  emptyRender,
  loading,
  loader,
}) => {
  const getComp = (): any => {
    if (loading) {
      return <>{loader}</>;
    }
    if (_.isEmpty(dependencies)) {
      return <>{emptyRender}</>;
    }
    return <>{children}</>;
  };
  return <>{getComp()}</>;
};

Nullable.defaultProps = {
  emptyRender: null,
  loading: false,
  loader: null,
};
