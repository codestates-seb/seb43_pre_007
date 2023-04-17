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
    { hour: '2-digit', minute: '2-digit' },
  ];

  for (const filter of options) {
    const [key] = Object.keys(filter);
    const parse = new Intl.DateTimeFormat('en', filter).format(date);

    if (key === 'day') res.push(parse + ',');
    else if (key === 'hour') res.push(...['at', parse.split(' ')[0]]);
    else res.push(parse);
  }

  return res.join(' ');
};
