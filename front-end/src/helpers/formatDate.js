export default function formatDate(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return [
    (date.getDate()).toString().padStart(2, '0'),
    (date.getMonth()).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
}
