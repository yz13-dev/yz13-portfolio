import { transformData, type Activity, type ApiErrorResponse, type ApiResponse, type Year } from "@/utils/github-contribution";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/ui/tooltip";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import Calendar, {
  Skeleton,
  type Props as ActivityCalendarProps,
  type ThemeInput
} from 'react-activity-calendar';

export const CalendarSkeleton = Skeleton;

const gitHubTheme = {
  light: ['#ffffff', '#d3d3d3', '#a9a9a9', '#808080', '#000000'],
  dark: ['#000000', '#1a1a1a', '#333333', '#666666', '#ffffff'],
} satisfies ThemeInput;

const labels = {
  months: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  weekdays: [
    'Вс', // Воскресенье первым!
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
  ],
  totalCount: '{{count}} активностей в {{year}} году',
  legend: {
    less: 'Меньше',
    more: 'Больше',
  },
} satisfies ActivityCalendarProps['labels']

export type Props = {
  username: string
  errorMessage?: string
  throwOnError?: boolean
  transformData?: (data: Array<Activity>) => Array<Activity>
  transformTotalCount?: boolean
  year?: Year
} & Omit<ActivityCalendarProps, 'data'>

export default function ({
  username,
  year = 'last',
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}: Props) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  const totalCount = year === 'last' ? data ? data.total.lastYear : 0 : data ? data.total[year] : 0;

  async function fetchCalendarData(username: string, year: Year): Promise<ApiResponse> {
    try {
      const apiUrl = 'https://github-contributions-api.jogruber.de/v4/'
      const response = await fetch(`${apiUrl}${username}?y=${String(year)}`)
      const data = (await response.json()) as ApiResponse | ApiErrorResponse

      if (!response.ok) {
        throw Error(
          `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
        )
      }

      return data as ApiResponse
    } catch (error) {
      console.error(error)
      return {
        contributions: [],
        total: {
          lastYear: 0,
        },
      }
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchCalendarData(username, year)
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const contributions = data?.contributions ?? [];

  const calendar = (transformData(contributions, transformFn) ?? [])

  useEffect(() => {
    if (loading) return;
    const div = document.querySelector('.react-activity-calendar__scroll-container');
    if (div) {
      const width = div.scrollWidth + 50;
      div.scrollTo({ left: width })
    }
  }, [loading])
  useEffect(() => {
    fetchData()
  }, [username])

  if (loading) return <Skeleton
    loading
    blockSize={24}
    blockRadius={6}
  />
  return (
    <Calendar
      {...props}
      ref={ref}
      data={calendar}
      labels={labels}
      blockSize={24}
      blockRadius={6}
      showWeekdayLabels={["mon", "fri"]}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      weekStart={0}
      theme={gitHubTheme}
      maxLevel={4}
      renderBlock={(block, activity) => {
        const date = new Date(activity.date);
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              {block}
            </TooltipTrigger>
            <TooltipContent side="left">
              {activity.count} активностей {format(date, "dd MMMM", { locale: ru })}
            </TooltipContent>
          </Tooltip>
        )
      }}
    />
  )
}
