
export function monthAcronym(date: Date) {
  const acronyms = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  return acronyms[date.getMonth()]
}