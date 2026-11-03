const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

export function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
