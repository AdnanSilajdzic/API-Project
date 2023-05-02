//function that takes a number of days as paramater and returns the time in unix format
export default function daysAgoUnixTime(days: number) {
  const now = new Date(); // Get the current date and time
  const daysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000); // Subtract days in milliseconds
  const daysAgoUnixTime = Math.floor(daysAgo.getTime() / 1000); // Convert days ago date and time to Unix timestamp
  return daysAgoUnixTime;
}
