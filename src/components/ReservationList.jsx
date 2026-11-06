export default function ReservationList({ items, admin, onCancel, date }) {
  const sorted = [...items].sort((a, b) => a.time.localeCompare(b.time));
  return (
    <section className="card">
      <h2>Reservas del {date.split('-').reverse().join('/')}</h2>
      {sorted.length === 0 && <p>No hay reservas para este día.</p>}
      <ul className="list">
        {sorted.map((r) => (
          <li key={r.id}>
            <div>
              <strong>{r.time}</strong> · Mesa {r.table} · {r.guests} pers.
              {admin ? <div>{r.name} · {r.phone}</div> : <div>Ocupada</div>}
            </div>
            {admin && <button type="button" className="danger" onClick={() => onCancel(r.id)}>Cancelar</button>}
          </li>
        ))}
      </ul>
    </section>
  );
}
