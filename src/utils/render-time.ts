// type为true时，返回2022-02-18，false时返回2022-02-18 00:00:00
export function renderTime(time: string, type = true) {
  const date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
  let newDate = date.toJSON()
  if (type) {
    newDate = newDate.substring(0, 10)
  } else {
    newDate = newDate.substring(0, 19).replace('T', '  ')
  }
  return newDate
}
