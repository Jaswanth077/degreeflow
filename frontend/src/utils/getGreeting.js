export function getGreeting() {
  const hrs = new Date().getHours();
  if (hrs < 12) return "Good Morning";
  if (hrs < 17) return "Good Afternoon";
  return "Good Evening";
}
