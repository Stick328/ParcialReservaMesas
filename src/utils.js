export const DURATION = 120; // minutos por reserva
export const TABLES = [
  { id: 1, seats: 2 }, { id: 2, seats: 2 }, { id: 3, seats: 4 }, { id: 4, seats: 4 },
  { id: 5, seats: 4 }, { id: 6, seats: 6 }, { id: 7, seats: 6 }, { id: 8, seats: 8 },
];
const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
// Dos reservas chocan si son el mismo día y sus intervalos se cruzan
export const overlaps = (a, b) =>
  a.date === b.date && toMin(a.time) < toMin(b.time) + DURATION && toMin(b.time) < toMin(a.time) + DURATION;
export const isTableFree = (list, tableId, date, time) =>
  !list.some((r) => r.table === tableId && overlaps(r, { date, time }));
export const freeTables = (list, date, time, guests) =>
  TABLES.filter((t) => t.seats >= guests && isTableFree(list, t.id, date, time));
export const SLOTS = Array.from({ length: 21 }, (_, i) => {
  const mins = 12 * 60 + i * 30;
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${mins % 60 === 0 ? '00' : '30'}`;
});
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
