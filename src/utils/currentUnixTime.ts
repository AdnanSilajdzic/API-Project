//function that returns the current time in unix format
export default function currentUnixTime() {
  const now = new Date(); // Get the current date and time
  const nowUnixTime = Math.floor(now.getTime() / 1000); // Convert current date and time to Unix timestamp
  return nowUnixTime;
}
