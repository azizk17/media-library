// convert youtube date to human readable date
export function convertDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString();
}

// convert youtube duration to ms eg:
export function convertDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  // check if match is null
  if (!match) {
    return 0;
  }
  const hours = (parseInt(match[1]) || 0) * 3600;
  const minutes = (parseInt(match[2]) || 0) * 60;
  const seconds = parseInt(match[3]) || 0;
  return hours + minutes + seconds;
}

// convert youtube duration to human readable duration eg: 1h 30m 20s
export function convertDurationToHuman(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  // check if match is null
  if (!match) {
    return 0;
  }

  const hours = (parseInt(match[1]) || 0) * 3600;
  const minutes = (parseInt(match[2]) || 0) * 60;
  const seconds = parseInt(match[3]) || 0;
  return `${hours ? hours + "h" : ""} ${minutes ? minutes + "m" : ""} ${
    seconds ? seconds + "s" : ""
  }`;
}

// convert youtube duration to 00:00:00 format eg 1:30:00
export function convertDurationToTime(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  // check if match is null
  if (!match) {
    return 0;
  }
  const hours = (parseInt(match[1]) || 0) * 3600;
  const minutes = (parseInt(match[2]) || 0) * 60;
  const seconds = parseInt(match[3]) || 0;
  return `${hours ? hours + ":" : ""} ${minutes ? minutes + ":" : ""} ${
    seconds ? seconds : ""
  }`;
}

// convert date to human readable date format. eg: Monday, 16 August 2021
export function convertDateToHuman(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// convert date to diff from now. eg: 1 second, 1 minute, 1 day, 1 mounth, 1 year
export function convertDateToDiff(date: string | Date) {
  const diff = Math.abs(new Date().getTime() - new Date(date).getTime());
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    return `${years} year${years > 1 ? "s" : ""}`;
  }
}
