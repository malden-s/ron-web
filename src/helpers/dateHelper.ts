const pad = (n: number) => {
  const s = n.toString();
  if (s.length === 1) {
    return "0" + s;
  }
  return s;
}

const month = (n: number, full = false) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return full
    ? months[n]
    : months[n].substring(0, 3);
}

export const formatCalendar = (date: Date) => {
  const today = new Date();
  if (today.getTime() - date.getTime() < 1000 * 60 * 5) {
    return "Now";
  } else if (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  ) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else if (today.getFullYear() === date.getFullYear()) {
    return `${month(date.getMonth())} ${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  return `${date.getFullYear()} ${month(date.getMonth())} ${pad(
    date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const parseDate = (string: string) => {
  return new Date(string.replace(" ", "T") + "+08:00");
}
