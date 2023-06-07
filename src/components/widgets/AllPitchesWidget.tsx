import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { apiConfigs } from "../../apis/configs";
import moment from "moment";
import { useCenterContext } from "../contextProviders/centerContext";
import { SkeletonLoader } from "../common/SkeletonLoader/SkeletonLoader";
import { WidgetContainer } from "../common/WidgetContainer/WidgetContainer";
import { WidgetHeader } from "../common/WidgetHeader/WidgetHeader";
import { WidgetCard } from "../common/WidgetCard/WidgetCard";
import { Table } from "../common/Table";
import { Nullable } from "../common/Nullable";
import { FieldType, OrientationType, PitchSourceLabel } from "../../constants";
import { SubHeader } from "../common/SubHeader";
import { AppUtils } from "../../utils/appUtils";
import { _ } from "../../utils/lodash";

type AllPitchesWidgetProps = {
  pageSize?: number;
};

export const AllPitchesWidget: React.FC<AllPitchesWidgetProps> = ({
  pageSize,
}) => {
  const { selectedCenter } = useCenterContext();
  const [pitchDate, setPitchDate] = useState(new Date());

  const { data: employeeList = [], isLoading: isEmployeeListLoading = false } =
    useQuery({
      ...apiConfigs.getEmployeeListConfig(
        {
          centerServiceId: selectedCenter.centerServiceId,
          centerId: String(selectedCenter?.id || 0),
          roleName: "PARTNER_STAFF",
        },
        selectedCenter.partnerCenterType
      ),
    });

  const { data: allPitches = [], isLoading: pitchLoading } = useQuery({
    ...apiConfigs.getPitchesConfig(
      {
        centerServiceCenterId: String(selectedCenter?.centerServiceId || 0),
        startTime: moment(pitchDate).format("YYYY-MM-DD"),
        endTime: moment(pitchDate).add(1, "day").format("YYYY-MM-DD"),
      },
      selectedCenter?.partnerCenterType
    ),
    enabled: Boolean(selectedCenter?.centerServiceId || 0),
  });

  const getPitchTableConfig = useMemo(() => {
    return [
      {
        Header: "Customer Name",
        accessor: "customerName",
        Cell: ({ value }: any) => {
          return value || "-";
        },
      },
      {
        Header: "Customer Phone",
        accessor: "customerPhone",
        Cell: ({ value }: any) => {
          return (value && AppUtils.maskPhoneNumber(value)) || "-";
        },
      },
      {
        Header: "Pitched By (ID)",
        accessor: "pitchedByUserId",
        Cell: ({ value }: any) => {
          const pitchedUser = _.find(employeeList, {
            value: Number(value),
          });
          return (
            `${
              pitchedUser && pitchedUser?.label
                ? pitchedUser && pitchedUser?.label
                : ""
            } (${value})` || "-"
          );
        },
      },
      {
        Header: "Where",
        accessor: "source",
        Cell: ({ value }: any) => {
          return (value && (PitchSourceLabel as any)[value]) || "-";
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: any) => {
          return value || "-";
        },
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        Cell: ({ value }: any) => {
          return value || "-";
        },
      },
      {
        Header: "Pitched at",
        accessor: "createdAt",
        Cell: ({ value }: any) => {
          return moment(value).format("Do MMM YY[,] hh:mm A") || "-";
        },
      },
    ];
  }, [employeeList]);

  const getSubHeader = (): React.ReactNode => {
    const subHeaderConfig = [
      {
        type: FieldType.CALENDAR,
        orientation: OrientationType.RIGHT,
        setDate: setPitchDate,
        date: pitchDate,
      },
    ];
    return <SubHeader key="allPitches" subHeaderConfig={subHeaderConfig} />;
  };

  return (
    <Nullable
      dependencies={[[]]}
      loader={<SkeletonLoader length={1} />}
      loading={pitchLoading || isEmployeeListLoading}
    >
      <WidgetContainer>
        <WidgetHeader title="All Pitches">{getSubHeader()}</WidgetHeader>
        <WidgetCard zeroPadding alignCol>
          <Table
            loading={pitchLoading || isEmployeeListLoading}
            data={allPitches}
            columns={getPitchTableConfig}
            pageSize={pageSize}
          />
        </WidgetCard>
      </WidgetContainer>
    </Nullable>
  );
};

AllPitchesWidget.defaultProps = {
  pageSize: 5,
};
