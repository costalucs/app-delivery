export default function formatDate(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return [
    (date.getDate()).toLocaleString().padStart(2, '0'),
    (date.getMonth() + 1).toLocaleString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
}
