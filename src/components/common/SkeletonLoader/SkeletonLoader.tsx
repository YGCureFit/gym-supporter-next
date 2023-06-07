import React from "react";
import { Animatable } from "../Animatable/Animatable";

type SubSkeletonProps = {
  small?: boolean;
};

const SubSkeleton: React.FC<SubSkeletonProps> = ({ small }) => (
  <Animatable className="animate-pulse inline-flex space-x-4 m-4">
    <div className="rounded-full bg-gray-cf-500 h-12 w-12" />
    <div className="flex-1 space-y-4 py-1">
      <div className="h-4 bg-gray-cf-500 rounded-xl w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-cf-500 rounded-xl" />
        {small ? null : <div className="h-4 bg-gray-cf-500 rounded-xl w-5/6" />}
      </div>
      {small ? null : (
        <>
          <div className="space-y-2">
            <div className="h-4 bg-gray-cf-500 rounded-xl" />
            <div className="h-4 bg-gray-cf-500 rounded-xl w-5/6" />
          </div>
        </>
      )}
    </div>
  </Animatable>
);

SubSkeleton.defaultProps = {
  small: false,
};

type SkeletonProps = {
  length: number;
  small?: boolean;
};

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  length = 0,
  small,
}) => (
  <Animatable className="p-5 w-full inline-flex justify-between align-items-stretch flex-col screen self-center my-auto text-center mx-auto">
    {new Array(length).fill(0).map(() => (
      <SubSkeleton key={Math.floor(Math.random() * 10000)} small={small} />
    ))}
  </Animatable>
);

SkeletonLoader.defaultProps = {
  small: false,
};
