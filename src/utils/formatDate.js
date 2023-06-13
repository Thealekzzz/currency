export default function formatDate(date) {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  return [
    date.getFullYear(),
    date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1),
    date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate(),
  ].join(".") + " " + [
    date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours(),
    date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes(),
    date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds(),
  ].join(":")
}