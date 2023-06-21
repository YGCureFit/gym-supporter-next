"use client";
import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import { GFCheckIn } from "@/mockData/MockModels";
import "../../styles/output.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import { SkeletonLoader } from "../../components/common/SkeletonLoader/SkeletonLoader";
// import { useCenterContext } from "../components/contextProviders/centerContext";
import { mockCenterContext } from "@/mockContexts/centerContext";
import { GymfitCheckIn, GymfitCheckInState } from "@curefit/gymfit-common";
import { AppUtils } from "../../utils/appUtils";
import { AssignTrainerModal } from "../../modals/AssignTrainerModal/AssignTrainerModal";
import { GridItem } from "../../components/common/GridItem/GridItem";
import { Nullable } from "../../components/common/Nullable/Nullable";
import { PageContainer } from "../../components/common/PageContainer/PageContainer";
import { SearchBar } from "../../components/stateful/SearchBar/SearchBar";
import { Header } from "../../components/common/Header/Header";
import { WidgetContainer } from "../../components/common/WidgetContainer/WidgetContainer";
import { IconButton } from "../../components/common/IconButton/IconButton";
import { WidgetHeader } from "../../components/common/WidgetHeader/WidgetHeader";
import { GridContainer } from "../../components/common/GridContainer/GridContainer";
import { WidgetCard } from "../../components/common/WidgetCard/WidgetCard";
// import {GrayButton} from '../components/common/GrayButton'
import { UserProfileCard } from "../../components/common/UserProfileCard/UserProfileCard";
import { CheckinMeta } from "../../components/common/CheckinMeta/CheckinMeta";
import { Scrollable } from "../../components/common/Scrollable/Scrollable";
// import { useCheckins } from "../../hooks/checkins";
// import { useCustomerContext } from "../../components/contextProviders/customerContext";
import { mockCustomerContext } from "../../mockContexts/customerContext";
import { useMutation } from "react-query";
import { apiConfigs } from "../../apis/configs";
import { toastError, toastSuccess } from "../../utils/toastify";
import { ShowPhoneNumberModal } from "../../modals/ShowPhoneNumberModal/ShowPhoneNumberModal";
import { TrainerUserCallModal } from "../../modals/TrainerUserCallModal/TrainerUserCallModal";
import ReactDOM from "react-dom";
const queryClient = new QueryClient();

// type CheckinsProps = {
//   title: string;
//   checkinState: GymfitCheckInState.CREATED | GymfitCheckInState.VALIDATED;
// };

const renderNothingHere = (): ReactNode => (
  <div
    className={clsx(
      "w-full",
      "text-gray-cf-400",
      "font-semibold",
      "flex",
      "items-center",
      "justify-center",
      "my-4"
    )}
  >
    Ah, empty right now!
  </div>
);

export default function Checkin() {
  // const queryClient = new QueryClient();

  const [checkinState] = useState(GymfitCheckInState.CREATED);
  const title = "Check in";
  const [trainerModalVisibility, setTrainerModalVisibility] =
    useState<boolean>(false);

  const [selectedCheckIn, setSelectedCheckIn] = useState<GymfitCheckIn | null>(
    null
  );
  const [startDate, setStartDate] = useState<any>(new Date());
  const [timeData, setTimeData] = useState<any>({
    startTime:
      checkinState === GymfitCheckInState.VALIDATED
        ? null
        : moment().startOf("day").toDate(),
    endTime:
      checkinState === GymfitCheckInState.VALIDATED
        ? null
        : moment().endOf("day").toDate(),
  });

  const [selectedUserIdForCall, setSelectedUserIdForCall] = useState(null);
  const [showPhoneNumberModalVisible, setShowPhoneNumberModalVisible] =
    useState<boolean>(false);
  const [trainerUserCallModalVisible, setTrainerUserCallModalVisible] =
    useState<boolean>(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
  const [userNameForCall, setUserNameCall] = useState("");
  const [cmPhoneNumber, setCmPhone] = useState("");

  const { startTime = null, endTime = null } = timeData;
  //   const { selectedCenter } = useCenterContext();
  const selectedCenter = mockCenterContext;
  const { searchUserById } = mockCustomerContext;

  const setStartTime = (time: any): any => {
    setTimeData({
      ...timeData,
      startTime: time,
    });
  };

  const setEndTime = (time: any): any => {
    setTimeData({
      ...timeData,
      endTime: time,
    });
  };
  //   const { detectMob } = useCenterContext();
  const detectMob = mockCenterContext;
  const getMergedTimestamp = (date: Date, time: Date): any => {
    const onlyDate = moment(date).format("YYYY/MM/DD");
    const onlyTime = moment(time).format("h:mm a");

    const mergedDateTime = moment(`${onlyDate} ${onlyTime}`);
    return mergedDateTime.valueOf();
  };
  const {
    unassignedNewMembers = GFCheckIn,
    unassignedTrials = GFCheckIn,
    assignedTrials = GFCheckIn,
    assignedNewMembers = GFCheckIn,
    existingMembers = GFCheckIn,
    isLoading = false,
    refetchCheckins = () => {},
    unassignedComplementaryMembers = [],
    assignedComplementaryMembers = [],
    existingComplementaryMembers = [],
  } = {};

  // const {
  //   unassignedNewMembers,
  //   unassignedTrials,
  //   assignedTrials,
  //   assignedNewMembers,
  //   existingMembers,
  //   isLoading = false,
  //   refetchCheckins,
  //   unassignedComplementaryMembers,
  //   assignedComplementaryMembers,
  //   existingComplementaryMembers,
  // } = useCheckins({
  //   filters: {
  //     centerId: Number(selectedCenter?.id) || 0,
  //     includeUserDetails: true,
  //     pageNumber: 1,
  //     pageSize: 10000,
  //     startTimeFrom: startTime
  //       ? AppUtils.getMergedTimestamp(startDate, startTime)
  //       : null,
  //     startTimeTo: endTime
  //       ? AppUtils.getMergedTimestamp(startDate, endTime)
  //       : null,
  //     states: [checkinState],
  //   },
  //   checkinState,
  // });

  const getUserPhoneNumberFunction = (userId: any): void => {
    console.log("userid detail ", userId);
    setSelectedUserIdForCall(userId);
    // getUserPhoneNumber({ userId, centerId: selectedCenter?.id });
  };

  // const { mutate: getUserPhoneNumber } = useMutation(
  //   apiConfigs.getUserPhoneNumberConfig().queryFn,
  //   {
  //     onSuccess: (data: any) => {
  //       ?? } else {
  //         setTrainerUserCallModalVisible(true);
  //         setUserNameCall(data?.userName);
  //         setCmPhone(data?.cmPhone);
  //       }
  //     },
  //     onError: (...args: any) => {
  //       toastError(
  //         args?.response?.data?.message ||
  //           args?.response?.message ||
  //           args?.message
  //       );
  //     },
  //   }
  // );

  // const { mutate: callUserIVR } = useMutation(
  //   apiConfigs.callUserIVRConfig().queryFn,
  //   {
  //     onSuccess: (data: any) => {
  //       console.log("user Phone number is ", data);
  //       toastSuccess(data?.sent ? `you will recieve a call` : `Call Failed`);
  //       setTrainerUserCallModalVisible(false);
  //     },
  //     onError: (...args: any) => {
  //       toastError(
  //         args?.response?.data?.message ||
  //           args?.response?.message ||
  //           args?.message
  //       );
  //       setTrainerUserCallModalVisible(false);
  //     },
  //   }
  // );

  // const history = useNavigate();

  useEffect(() => {
    if (checkinState === GymfitCheckInState.VALIDATED) {
      if (moment().diff(startDate, "days") > 0) {
        setTimeData({
          startTime: moment(startDate).startOf("day").toDate(),
          endTime: moment().endOf("day").toDate(),
        });
      } else if (moment().diff(startDate, "days") === 0) {
        setTimeData({
          startTime: moment().subtract(90, "minutes").toDate(),
          endTime: moment().add(1, "minutes").toDate(),
        });
      }
    }
  }, [startDate]);

  const loading = isLoading;

  const toggleTrainerModal: any = () =>
    setTrainerModalVisibility((value) => !value);

  const renderUserProfileCard = (
    checkinItem: any,
    withTrainerAssignment = false
  ) => {
    console.log("checkinTime value is ", JSON.stringify(checkinItem));
    const {
      startTime,
      validatedAt,
      firstName = "",
      lastName = "",
      profilePictureUrl = "",
      userId: id = 0,
      leadType = checkinItem?.lead?.leadType,
      isCallEnabledCenter = false,
    } = checkinItem;

    return (
      // <QueryClientProvider client={queryClient}>
      <Router>
        <UserProfileCard
          name={`${firstName} ${lastName}`}
          imageUrl={profilePictureUrl}
          key={`${id} ${startTime}`}
          time={validatedAt}
          leadType={leadType}
          getUserPhoneNumber={() => getUserPhoneNumberFunction(id)}
          onClick={() => {
            // searchUserById;
            // history({
            //   pathname: "/user",
            //   search: "Checkins=true",
            // });
          }}
          id={Number(id)}
          // isCallEnabledCenter={isCallEnabledCenter}
        >
          <CheckinMeta checkinDetails={checkinItem} />
          {withTrainerAssignment ? (
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                onClick={(event) => {
                  setSelectedCheckIn(checkinItem);
                  toggleTrainerModal();
                  event.stopPropagation();
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "7px 10px 7px 10px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "16px",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "white",
                  borderRadius: 7,
                }}
              >
                Assign Trainer
              </div>
            </div>
          ) : null}
        </UserProfileCard>
      </Router>
      // </QueryClientProvider>
    );
  };

  const CustomInputDate = forwardRef(({ onClick }: any, ref) => (
    <IconButton onClick={onClick} ref={ref as any}>
      <FaCalendar />
    </IconButton>
  ));
  CustomInputDate.displayName = "CustomInputDate";

  const CustomTime = forwardRef(({ value, onClick }: any, ref) => (
    <button
      className={clsx(
        "text-gray-cf-50",
        "text-xs",
        "flex",
        "h-8",
        "px-4",
        "items-center",
        "justify-center",
        "bg-gray-cf-700",
        "rounded"
      )}
      onClick={onClick}
      ref={ref as any}
    >
      {value}
    </button>
  ));
  CustomTime.displayName = "CustomTime";

  const renderTimeSelector = (
    title: string,
    state: any,
    setState: any
  ): ReactNode => (
    <div
      className={clsx("flex", "items-center", "justify-start", "mx-4", "my-2")}
    >
      <div
        className={clsx(
          "text-gray-cf-50",
          "text-sm",
          "min-w-max",
          "font-bold",
          "mr-4"
        )}
      >
        {title}
      </div>
      <DatePicker
        selected={state}
        showPopperArrow={false}
        onChange={(date) => setState(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption={title}
        dateFormat="h:mm aa"
        customInput={<CustomTime />}
        enableTabLoop
        // showTimeInput
      />
    </div>
  );

  const renderDateTimeSelector = (): ReactNode => (
    // <QueryClientProvider client={queryClient}>
    <>
      <div
        className={clsx(
          "flex",
          "text-gray-cf-900",
          "min-w-max",
          "items-center",
          "pt-2"
        )}
      >
        <IconButton
          onClick={() => {
            setStartDate(moment(startDate).subtract(1, "days").toDate());
          }}
        >
          ❮
        </IconButton>
        <div
          className={clsx(
            "min-w-max",
            "flex-nowrap",
            "self-center",
            "my-auto",
            "font-bold",
            "text-gray-cf-50"
          )}
        >
          {moment(startDate).format("ddd DD MMM")}
        </div>
        {checkinState === GymfitCheckInState.VALIDATED ? (
          moment().diff(moment(startDate), "days") ? (
            <IconButton
              onClick={() => {
                setStartDate(moment(startDate).add(1, "days").toDate());
              }}
            >
              ❯
            </IconButton>
          ) : null
        ) : (
          <IconButton
            onClick={() => {
              setStartDate(moment(startDate).add(1, "days").toDate());
            }}
          >
            ❯
          </IconButton>
        )}
        <DatePicker
          showPopperArrow={false}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInputDate />}
          todayButton="Today"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={
            checkinState === GymfitCheckInState.VALIDATED
              ? moment().toDate()
              : null
          }
        />
      </div>
      <div
        className={clsx("flex", "min-w-max", "items-center", "justify-start")}
      >
        {renderTimeSelector("From", startTime, setStartTime)}
        {renderTimeSelector("To", endTime, setEndTime)}
      </div>
    </>
    // {/* </QueryClientProvider> */}
  );
  const unassignedTrialsCount = unassignedTrials.length || 0;
  const unassignedNewMembersCount = unassignedNewMembers.length || 0;
  const unassignedComplementaryMembersCount =
    unassignedComplementaryMembers.length || 0;
  // const unassignedTrialsCount = 3;
  // const unassignedNewMembersCount = 2;
  // const unassignedComplementaryMembersCount = 1;

  // console.log(detectMob ? "true" : "false");
  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <Header title={title}>
          {/* {!detectMob ? ( //detectMob() to detectMob
            <SearchBar placeHolder="Search member by mobile number or user id" />
          ) : null} */}
          <SearchBar placeHolder="Search member by mobile number or user id" />
        </Header>
        <div className={clsx("m-4")}>{renderDateTimeSelector()}</div>
        <Nullable
          loading={loading}
          loader={<SkeletonLoader length={2} />}
          dependencies={[
            ...unassignedTrials,
            ...unassignedNewMembers,
            ...assignedTrials,
            ...assignedNewMembers,
            ...existingMembers,
            ...unassignedComplementaryMembers,
            ...assignedComplementaryMembers,
            ...existingComplementaryMembers,
          ]}
          emptyRender={renderNothingHere()}
        >
          <Nullable
            dependencies={[...unassignedTrials, ...unassignedNewMembers]}
          >
            <WidgetContainer>
              <WidgetHeader title="Unassigned Members" />
              <GridContainer
                cols={
                  !detectMob //detectMob() to detectMob
                    ? (unassignedTrialsCount +
                        unassignedNewMembersCount +
                        unassignedComplementaryMembersCount) *
                      2
                    : 2
                }
                gap={4}
              >
                <Nullable dependencies={unassignedTrials}>
                  <GridItem
                    colSpan={!detectMob ? unassignedTrialsCount * 2 : 2}
                  >
                    <WidgetCard title="Trials">
                      <Scrollable light>
                        <div
                          className={clsx("xs:grid xs:grid-cols-2 sm:contents")}
                        >
                          {unassignedTrials.map((checkin: GymfitCheckIn) =>
                            (renderUserProfileCard as any)(checkin, true)
                          )}
                        </div>
                      </Scrollable>
                    </WidgetCard>
                  </GridItem>
                </Nullable>
                <Nullable dependencies={unassignedNewMembers}>
                  <GridItem
                    colSpan={!detectMob ? unassignedNewMembersCount * 2 : 2}
                  >
                    <WidgetCard title="New Members">
                      <Scrollable light>
                        <div
                          className={clsx("xs:grid xs:grid-cols-2 sm:contents")}
                        >
                          {unassignedNewMembers.map((checkin: GymfitCheckIn) =>
                            (renderUserProfileCard as any)(checkin, true)
                          )}
                        </div>
                      </Scrollable>
                    </WidgetCard>
                  </GridItem>
                </Nullable>
                <Nullable dependencies={unassignedComplementaryMembers}>
                  <GridItem
                    colSpan={
                      !detectMob ? unassignedComplementaryMembersCount * 2 : 2
                    }
                  >
                    <WidgetCard title="New Complementary Members">
                      <Scrollable light>
                        <div
                          className={clsx("xs:grid xs:grid-cols-2 sm:contents")}
                        >
                          {unassignedComplementaryMembers.map((checkin: any) =>
                            (renderUserProfileCard as any)(checkin, true)
                          )}
                        </div>
                      </Scrollable>
                    </WidgetCard>
                  </GridItem>
                </Nullable>
              </GridContainer>
            </WidgetContainer>
          </Nullable>
          <Nullable dependencies={assignedTrials}>
            <WidgetContainer>
              <WidgetHeader title="Trial Users" />
              <div className={clsx("flex", "flex-wrap")}>
                {assignedTrials.map((checkin: GymfitCheckIn) =>
                  (renderUserProfileCard as any)(checkin, false)
                )}
              </div>
            </WidgetContainer>
          </Nullable>
          <Nullable dependencies={assignedNewMembers}>
            <WidgetContainer>
              <WidgetHeader title="New Members" />
              <div className={clsx("flex", "flex-wrap")}>
                {assignedNewMembers.map((checkin: GymfitCheckIn) =>
                  (renderUserProfileCard as any)(checkin, false)
                )}
              </div>
            </WidgetContainer>
          </Nullable>

          <Nullable dependencies={assignedComplementaryMembers}>
            <WidgetContainer>
              <WidgetHeader title="Assigned Complementary Members" />
              <div className={clsx("flex", "flex-wrap")}>
                {assignedComplementaryMembers.map((checkin: GymfitCheckIn) =>
                  (renderUserProfileCard as any)(checkin, false)
                )}
              </div>
            </WidgetContainer>
          </Nullable>

          <Nullable dependencies={existingMembers}>
            <WidgetContainer>
              <WidgetHeader title="Existing Members" />
              <div className={clsx("flex", "flex-wrap")}>
                {existingMembers.map((checkin: GymfitCheckIn) =>
                  (renderUserProfileCard as any)(checkin, false)
                )}
              </div>
            </WidgetContainer>
          </Nullable>

          <Nullable dependencies={existingComplementaryMembers}>
            <WidgetContainer>
              <WidgetHeader title="Existing Complementary Members" />
              <div className={clsx("flex", "flex-wrap")}>
                {existingComplementaryMembers.map((checkin: GymfitCheckIn) =>
                  (renderUserProfileCard as any)(checkin, false)
                )}
              </div>
            </WidgetContainer>
          </Nullable>
        </Nullable>
        {showPhoneNumberModalVisible ? (
          <ShowPhoneNumberModal
            modalVisibility={showPhoneNumberModalVisible}
            phoneNumber={userPhoneNumber}
            onClose={() => setShowPhoneNumberModalVisible(false)}
          />
        ) : null}
        {trainerUserCallModalVisible ? (
          <TrainerUserCallModal
            modalVisibility={trainerUserCallModalVisible}
            onClose={() => setTrainerUserCallModalVisible(false)}
            cmPhone={cmPhoneNumber}
            userName={userNameForCall}
            callUserFunction={
              () => {}
              // callUserIVR({
              //   userId: selectedUserIdForCall,
              //   centerId: selectedCenter?.id,
              // })
            }
          />
        ) : null}
        {trainerModalVisibility ? (
          <AssignTrainerModal
            modalVisibility={trainerModalVisibility}
            selectedCheckIn={selectedCheckIn}
            selectedCenter={selectedCenter}
            onClose={toggleTrainerModal}
            onTrainerAssignmentSuccess={() => {
              toggleTrainerModal();
              refetchCheckins();
            }}
          />
        ) : null}
      </PageContainer>
    </QueryClientProvider>
  );
}

// Checkin.defaultProps = {};
