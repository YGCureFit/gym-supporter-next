import React, { ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar } from "../Avatar/Avatar";
import moment from "moment";
import { _ } from "../../../utils/lodash";
// import { leadBackgroundColor } from "../../modals/SellPTModal";
import { IconButton } from "../IconButton/IconButton";
import { IoCall } from "react-icons/io5";

type UserProfileCardProps = {
  name: string;
  imageUrl?: string;
  children?: ReactNode;
  time: string;
  onClick?: (...args: any) => void;
  id: number;
  leadType: string;
  getUserPhoneNumber: null | (() => void);
};

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  imageUrl,
  children,
  time,
  onClick,
  id,
  leadType,
  getUserPhoneNumber,
}) => {
  const display = moment(Number(time)).format("hh:mm A");

  return (
    <motion.button
      layoutId={name}
      onClick={onClick}
      className={clsx(
        "p-2",
        "bg-gray-cf-600",
        "inline-flex",
        "flex-col",
        "items-center",
        "rounded-lg",
        "w-36",
        "cursor-pointer",
        "shadow-lg",
        "mr-3",
        "mb-3"
      )}
      style={{
        backgroundColor: "grey",
        // backgroundColor:
        //   leadType === "COLD"
        //     ? leadBackgroundColor("NOT_INTERESTED")?.backgroundColor
        //     : leadBackgroundColor(leadType)?.backgroundColor,
        borderRadius: 15,
      }}
    >
      <div className={clsx("w-32", "h-32", "mb-2")}>
        {imageUrl ? (
          <Image
            className={clsx(
              "rounded-lg",
              "object-cover",
              "w-32",
              "h-32",
              "overflow-hidden",
              "self-center"
            )}
            src={imageUrl || ""}
            alt="profileImage"
            // unloader={
            //   <Avatar
            //     size={32}
            //     numberKey={Number(id)}
            //     letter={name.charAt(0)}
            //   />
            // }
          />
        ) : (
          <Avatar size={32} numberKey={Number(id)} letter={name.charAt(0)} />
        )}
        {getUserPhoneNumber !== null ? (
          <div
            style={{
              display: "none",
              position: "relative",
              bottom: 19,
              marginBottom: 10,
              justifyContent: "center",
              left: 0,
              right: 0,
            }}
          >
            <IconButton
              customClass={["h-12", "w-12", "bg-gray-cf-700"]}
              onClick={(event) => {
                getUserPhoneNumber();
                event?.stopPropagation();
              }}
            >
              <IoCall size="21px" color="white" />
            </IconButton>
          </div>
        ) : null}
      </div>
      {leadType ? (
        <div
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: "10px",
            textAlign: "center",
            letterSpacing: "0.5px",
            color: "grey",
            // leadType === "COLD"
            //   ? leadBackgroundColor("NOT_INTERESTED")?.color
            //   : leadBackgroundColor(leadType)?.color,
            marginTop: "5px",
          }}
        >
          PT{" "}
          {leadType === "NOT_INTERESTED"
            ? "NOT INTERESTED"
            : `${leadType} LEAD`}
        </div>
      ) : null}
      <div
        className={clsx(
          "text-lg",
          "text-gray-cf-50",
          "font-semibold",
          "text-center",
          "m-auto",
          "filter",
          "drop-shadow",
          "py-1",
          "h-max",
          "flex",
          "flex-col",
          "items-center",
          "justify-center"
        )}
      >
        <div
          className={clsx(
            "w-32",
            "truncate",
            "whitespace-pre-wrap",
            "overflow-ellipsis"
          )}
        >
          {_.take(name.split(" "), 2)
            .map((text: string, index: number) => {
              const upperText = _.startCase(text);
              const modifiedText =
                upperText && index ? `${upperText.charAt(0)}.` : "";
              return modifiedText || upperText;
            })
            .join(" ")}
        </div>
        {moment(Number(time)).isValid() ? (
          <div>
            <div
              className={clsx(
                "w-32",
                "text-xs",
                "text-gray-cf-400",
                "font-normal"
              )}
            >
              Checked in at:
            </div>
            <div
              className={clsx(
                "text-gray-cf-400",
                "text-xs",
                "flex",
                "px-4",
                "items-center",
                "justify-center",
                "rounded",
                "font-normal"
              )}
            >
              at {display}
            </div>
          </div>
        ) : null}
      </div>
      {children}
    </motion.button>
  );
};

UserProfileCard.defaultProps = {
  children: null,
  imageUrl: "",
  onClick: () => {
    // do nothing
  },
};
