import { EMPLOYEE_PERFORMANCE } from "@/types/employeePerformance";
import Image from "next/image";
import { isArray } from "lodash";

const employeeData: EMPLOYEE_PERFORMANCE[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    callDuration: "3h 50m 4s",
    revenues: "5,768",
    closeDeals: 5,
    openDeals: 10,
    failDeals: 3,
    conversion: 50,
    active: true,
  },
  {
    avatar: "/images/user/user-06.png",
    name: "Jubin Jack",
    callDuration: "1h 50m 4s",
    revenues: "3,768",
    closeDeals: 2,
    openDeals: 7,
    failDeals: 6,
    conversion: 25.679,
    active: true,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Wilium Smith",
    callDuration: "2h 50m 4s",
    revenues: "3,768",
    closeDeals: 3,
    openDeals: 8,
    failDeals: 5,
    conversion: 33.333,
    active: true,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Henry Deco",
    callDuration: "6h 2m 4s",
    revenues: "9,768",
    closeDeals: 8,
    openDeals: 15,
    failDeals: 3,
    conversion: 80.456,
    active: false,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Leonard Thompson",
    callDuration: "4h 50m 4s",
    revenues: "7,768",
    closeDeals: 6,
    openDeals: 12,
    failDeals: 4,
    conversion: 70.707,
    active: null,
  },
];

const EmployeePerformance = () => {
  const getConversionColor = (conversionRate: number): string => {
    if (conversionRate < 30) {
      return "text-red";
    } else if (conversionRate >= 30 && conversionRate < 65) {
      return "text-orange";
    } else {
      return "text-green";
    }
  };
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Employee performance
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-7">
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Agent
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Call Duration
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenue
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Closed deals
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Open deals
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Failed deals
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div>

        {isArray(employeeData) &&
          employeeData.map((employee, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-7 ${
                key === employeeData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-dark-3"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3.5 px-2 py-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    width={48}
                    height={48}
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 ${
                      employee.active === true
                        ? "bg-green"
                        : employee.active === false
                          ? `bg-red-light`
                          : "bg-orange-light"
                    }`}
                  ></span>
                </div>
                <p className="hidden font-medium text-dark dark:text-white sm:block">
                  {employee.name}
                </p>
              </div>

              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {employee.callDuration}
                </p>
              </div>

              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-green-light-1">
                  ${employee.revenues}
                </p>
              </div>

              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {employee.closeDeals}
                </p>
              </div>
              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {employee.openDeals}
                </p>
              </div>
              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {employee.failDeals}
                </p>
              </div>

              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p
                  className={`font-medium ${getConversionColor(employee.conversion)} `}
                >
                  {employee.conversion?.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmployeePerformance;
