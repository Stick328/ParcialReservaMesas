import { useState } from 'react';
const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
const iso = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function Calendar({ reservations, selected, onSelect }) {
  const [cur, setCur] = useState(() => { const [y, m] = selected.split('-').map(Number); return { y, m: m - 1 }; });
  const offset = (new Date(cur.y, cur.m, 1).getDay() + 6) % 7;
  const total = new Date(cur.y, cur.m + 1, 0).getDate();
  const move = (n) => { const d = new Date(cur.y, cur.m + n, 1); setCur({ y: d.getFullYear(), m: d.getMonth() }); };
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <section className="card" aria-label="Calendario de reservas">
      <div className="cal-head">
        <button type="button" onClick={() => move(-1)} aria-label="Mes anterior">‹</button>
        <h2>{new Date(cur.y, cur.m).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}</h2>
        <button type="button" onClick={() => move(1)} aria-label="Mes siguiente">›</button>
      </div>
      <div className="grid">
        {DAYS.map((d) => <b key={d} className="dow">{d}</b>)}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const date = iso(cur.y, cur.m, d);
          const n = reservations.filter((r) => r.date === date).length;
          const level = n === 0 ? '' : n < 5 ? 'mid' : 'high';
          return (
            <button key={i} type="button" onClick={() => onSelect(date)}
              className={`day ${level} ${date === selected ? 'sel' : ''}`} aria-label={`${d}, ${n} reservas`}>
              {d}{n > 0 && <small>{n}</small>}
            </button>
          );
        })}
      </div>
      <p className="legend"><i className="mid" /> Pocas reservas <i className="high" /> Alta demanda</p>
    </section>
  );
}
