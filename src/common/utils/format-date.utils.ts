const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export function formatDate(dateTime: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(dateTime);

  if (!match) return dateTime;

  const [, year, month, day, hours, minutes] = match;

  return `${day} ${MONTH_NAMES[Number(month) - 1] ?? month} ${year} ${hours}:${minutes}`;
}
