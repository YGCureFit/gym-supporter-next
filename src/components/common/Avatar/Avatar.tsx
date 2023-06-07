import React from "react";
import clsx from "clsx";

type AvatarProps = {
  size: 10 | 24 | 28 | 32 | 36;
  numberKey: number;
  letter: string;
  roundedFull?: boolean;
};

const colorCodes = [
  "#FFC8A2",
  "#D4F0F0",
  "#8FCACA",
  "#CCE2CB",
  "#B6CFB6",
  "#FF968A",
  "#FFAEA5",
  "#FFC58F",
  "#FFD8BE",
  "#97C1A9",
  "#FCB9AA",
  "#FFDBCC",
  "#ECEAE4",
  "#A2E1DB",
  "#55CBCD",
  "#ABDEE6",
  "#CBAACB",
  "#FFCCB6",
  "#F3B0C3",
  "#C6DBDA",
  "#FEE1E8",
  "#FED7C3",
  "#F6EAC2",
  "#ECD5E3",
];

export const Avatar: React.FC<AvatarProps> = ({
  size,
  numberKey,
  letter,
  roundedFull,
}) => {
  const width = `w-${size}`;
  const height = `h-${size}`;
  const colorIdx = numberKey % colorCodes.length;
  return (
    <div
      className={clsx(
        { "rounded-lg": !roundedFull, "rounded-full": roundedFull },
        width,
        height,
        "overflow-hidden",
        "self-center",
        "text-gray-cf-50",
        "inline-flex",
        "items-center",
        "justify-center"
      )}
      style={{
        backgroundColor: colorCodes[colorIdx],
      }}
    >
      <div
        className={clsx(
          {
            "text-6xl": size === 24 || size === 28,
            "text-xl": size === 10,
            "text-7xl": size === 32,
            "text-8xl": size === 36,
          },
          "capitalize",
          "filter drop-shadow-lg",
          "font-semibold"
        )}
      >
        {letter}
      </div>
    </div>
  );
};

Avatar.defaultProps = {
  roundedFull: false,
};
