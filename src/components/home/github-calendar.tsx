import { fetchGithubContributions, ContributionCalendar } from '@/lib/github';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

const CELL = 11;
const GAP = 3;

function levelColor(count: number): string {
  if (count === 0) return LEVEL_COLORS[0];
  if (count <= 3) return LEVEL_COLORS[1];
  if (count <= 6) return LEVEL_COLORS[2];
  if (count <= 9) return LEVEL_COLORS[3];
  return LEVEL_COLORS[4];
}

function buildMonthLabels(weeks: ContributionCalendar['weeks']) {
  const labels: Array<{ label: string; col: number }> = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const d = week.contributionDays[0];
    if (!d) return;
    const m = parseInt(d.date.split('-')[1], 10) - 1;
    if (m !== lastMonth) {
      labels.push({ label: MONTHS[m], col: i });
      lastMonth = m;
    }
  });
  return labels;
}

export default async function GithubCalendar({ username }: { username: string }) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  let calendar: ContributionCalendar;
  try {
    calendar = await fetchGithubContributions(username, token);
  } catch {
    return null;
  }

  const firstDay = calendar.weeks[0]?.contributionDays[0];
  // Parse day-of-week from the date string to avoid timezone shifts
  const startDayOfWeek = firstDay
    ? new Date(firstDay.date + 'T12:00:00').getDay()
    : 0;

  const monthLabels = buildMonthLabels(calendar.weeks);

  return (
    <section id='github-activity'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-0.5'>
          <h3 className='text-xl font-bold'>GitHub Activity</h3>
          <p className='text-sm text-neutral-500'>
            {calendar.totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>

        <div className='overflow-x-auto pb-1'>
          <div
            className='relative'
            style={{ paddingTop: 18, paddingLeft: 28, width: 'max-content' }}
          >
            {/* Month labels */}
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className='absolute top-0 text-[10px] text-neutral-500 select-none'
                style={{ left: 28 + col * (CELL + GAP) }}
              >
                {label}
              </span>
            ))}

            {/* Grid */}
            <div className='flex' style={{ gap: GAP }}>
              {/* Day labels */}
              <div
                className='flex flex-col text-[9px] text-neutral-600 select-none'
                style={{ gap: GAP, width: 22 }}
              >
                {DAY_LABELS.map((label, i) => (
                  <div key={i} style={{ height: CELL, lineHeight: `${CELL}px` }}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              {calendar.weeks.map((week, wIdx) => {
                const cells = Array.from({ length: 7 }, (_, slot) => {
                  // Pad empty slots at the start of the first week
                  if (wIdx === 0 && slot < startDayOfWeek) return null;
                  const dayIdx = wIdx === 0 ? slot - startDayOfWeek : slot;
                  return week.contributionDays[dayIdx] ?? null;
                });

                return (
                  <div key={wIdx} className='flex flex-col' style={{ gap: GAP }}>
                    {cells.map((day, slot) => (
                      <div
                        key={slot}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          backgroundColor: day ? levelColor(day.contributionCount) : 'transparent',
                        }}
                        title={
                          day
                            ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`
                            : undefined
                        }
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className='flex items-center gap-1 mt-2 justify-end'>
              <span className='text-[10px] text-neutral-600 select-none'>Less</span>
              {LEVEL_COLORS.map((color, i) => (
                <div
                  key={i}
                  style={{ width: CELL, height: CELL, borderRadius: 2, backgroundColor: color }}
                />
              ))}
              <span className='text-[10px] text-neutral-600 select-none'>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
