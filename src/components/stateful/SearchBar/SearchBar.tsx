import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
// import { useCustomerContext } from "../../contextProviders/customerContext";
import { mockCustomerContext } from "@/mockContexts/customerContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../common/Spinner/Spinner";

type SearchBarProps = {
  setInputValue?: (arg: string) => void;
  placeHolder: string;
  searchInPlace?: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  setInputValue,
  placeHolder,
  searchInPlace,
}) => {
  // const history = useNavigate();
  const { userDetailsLoading, searchUserByPhone, searchUserById } =
    mockCustomerContext;

  const [text, setText] = useState(() => {
    return "";
  });

  const setTextOverride: any = (value: string) => {
    setText(value);
    setInputValue?.(value);
  };
  // @ts-ignore
  const isValidPhoneNumber = useCallback((phone: string) => {
    const digitMatcher = /^[0-9]+$/;
    return phone.length === 10 && phone.match(digitMatcher);
  });

  return (
    <>
      <motion.div
        className={clsx("py-2", "inline-flex")}
        layoutId="searchBarContainer"
      >
        <motion.div
          layoutId="searchbar"
          transition={{
            duration: 0.3,
          }}
          className={clsx(
            "focus-within:bg-gray-cf-900",
            "group",
            "outline-none",
            "flex",
            "items-center",
            "justify-center",
            "sm:p-4",
            "p-1",
            "sm:mt-0",
            "mt-2",
            "self-center",
            "sm:w-96",
            "w-80",
            "mx-2",
            "rounded",
            "bg-gray-cf-500",
            "backdrop-filter backdrop-blur-xl bg-opacity-30"
          )}
        >
          {userDetailsLoading ? (
            <Spinner />
          ) : (
            <FaSearch className={clsx("text-gray-cf-50", "mx-2")} />
          )}
          <input
            className={clsx(
              "sticky",
              "w-full",
              "text-xs",
              "sm:text-sm",
              "text-gray-cf-50",
              "caret-gray-cf-300",
              "placeholder-gray-cf-200",
              "px-2",
              "h-6",
              "outline-none",
              "bg-transparent"
            )}
            type="number"
            step={1}
            aria-label={placeHolder}
            placeholder={placeHolder}
            value={text}
            onChange={({ target: { value } }) => {
              if (value.length <= 10) {
                setTextOverride(value);
              }
            }}
            maxLength={10}
            disabled={userDetailsLoading}
            onKeyDown={(event) => {
              // if (event.key === "Enter") {
              //   if (!isValidPhoneNumber(text)) {
              //     searchUserById(text, () => {
              //       if (!searchInPlace) {
              //         history("/user");
              //       }
              //     });
              //   } else {
              //     searchUserByPhone(text, () => {
              //       if (!searchInPlace) {
              //         history("/user");
              //       }
              //     });
              //   }
              // }
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

SearchBar.defaultProps = {
  setInputValue: () => {
    // do nothing
  },
  searchInPlace: false,
};
