/**
 * @param inputDate '2023-04-01T17:19:50.26007'
 * @returns Nov 12, 2022 at 12:12
 */
export const dateFull = (inputDate: string) => {
  const res = [];
  const date = new Date(inputDate);
  const options: Array<Intl.DateTimeFormatOptions> = [
    { month: 'short' },
    { day: 'numeric' },
    { year: 'numeric' },
    { hour: '2-digit', minute: '2-digit', hour12: false },
  ];

  for (const filter of options) {
    const [key] = Object.keys(filter);
    const parse = new Intl.DateTimeFormat('en', filter).format(date);

    if (key === 'day') res.push(parse + ',');
    else if (key === 'hour') res.push(...['at', parse]);
    else res.push(parse);
  }

  return res.join(' ');
};

export const parseDate = (inputDate: string, toDetail: boolean = false) => {
  const perDay = 3600 * 24;

  const date: number =
    (new Date().valueOf() - new Date(inputDate).valueOf()) / 1000;

  if (!toDetail) {
    const filters: Array<{ [filter: string]: number }> = [
      { year: perDay * 365 },
      { month: perDay * 30 },
      { day: perDay },
    ];

    for (const filter of filters) {
      const [key, value] = Object.entries(filter)[0];

      if (date / value >= 1) {
        return key === 'day' && date / value < 2
          ? 'yesterday'
          : `${Math.floor(date / value)} ${key}${
              date / value >= 2 ? 's' : ''
            } ago`;
      }
    }

    return 'today';
  } else {
    const filters: Array<number> = [3600 * 24, 3600 * 24 * 2];

    for (const i in filters) {
      if (date / filters[i] < 1) return i === '0' ? 'today' : 'yesterday';
    }

    return dateFull(inputDate);
  }
};
