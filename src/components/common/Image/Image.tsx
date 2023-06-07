// import React from "react";
// import clsx, { ClassValue } from "clsx";
// import { FaUser } from "react-icons/fa";
// import Image from "next/image";
// import { Animatable } from "../Animatable/Animatable";

// type ImageProps = {
//   src: string;
//   alt: string;
//   classNames: ClassValue[];
//   loader?: React.ReactElement;
//   unloader?: React.ReactElement;
//   size?: number;
// };

// type ImageFallbackProps = {
//   loading?: boolean;
//   size?: number;
// };

// export const ImageFallback: React.FC<ImageFallbackProps> = ({
//   loading = false,
//   size,
// }) => (
//   <Animatable
//     className={clsx(
//       "text-gray-cf-500",
//       "self-center",
//       "my-1",
//       "mx-auto",
//       "inline-flex",
//       "w-full",
//       "h-full",
//       "justify-center",
//       "items-center",
//       {
//         "animate-pulse": loading,
//       }
//     )}
//   >
//     <FaUser size={size} />
//   </Animatable>
// );

// ImageFallback.defaultProps = {
//   loading: false,
//   size: 120,
// };

// export const ImageCard: React.FC<ImageProps> = ({
//   src,
//   alt,
//   classNames,
//   loader,
//   unloader,
//   size,
// }) => {
//   return (
//     <Image
//       className={clsx(classNames)}
//       alt={alt}
//       src={[src]}
//       // loader={loader}
//       unloader={unloader}
//     />
//   );
// };

// ImageCard.defaultProps = {
//   unloader: <ImageFallback />,
//   size: 120,
//   loader: <ImageFallback loading size={120} />,
// };
