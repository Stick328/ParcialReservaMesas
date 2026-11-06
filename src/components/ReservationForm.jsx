import { useState, useEffect } from 'react';
import { freeTables, SLOTS } from '../utils';

export default function ReservationForm({ reservations, onAdd, date }) {
  const [f, setF] = useState({ name: '', phone: '', guests: 2, date, time: '', table: '' });
  const [avail, setAvail] = useState([]);
  const [msg, setMsg] = useState(null);

  // Si el usuario elige otro día en el calendario, el formulario lo sigue
  useEffect(() => { setF((p) => ({ ...p, date })); }, [date]);

  // Recalcula mesas libres en tiempo real y evita conflictos
  useEffect(() => {
    const a = f.date && f.time ? freeTables(reservations, f.date, f.time, Number(f.guests)) : [];
    setAvail(a);
    setF((p) => (a.some((t) => t.id === Number(p.table)) ? p : { ...p, table: '' }));
  }, [reservations, f.date, f.time, f.guests]);

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !/^\d{9}$/.test(f.phone)) return setMsg({ ok: false, t: 'Ingresa nombre y un celular de 9 dígitos.' });
    if (!f.table) return setMsg({ ok: false, t: 'Elige una mesa disponible.' });
    onAdd({ ...f, id: Date.now(), guests: Number(f.guests), table: Number(f.table), name: f.name.trim() });
    setMsg({ ok: true, t: `Reserva confirmada: mesa ${f.table}, ${f.time}.` });
    setF({ ...f, name: '', phone: '', time: '', table: '' });
  };

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h2>Nueva reserva</h2>
      <label>Nombre<input name="name" value={f.name} onChange={change} autoComplete="name" /></label>
      <label>Celular<input name="phone" value={f.phone} onChange={change} inputMode="numeric" maxLength={9} /></label>
      <div className="row">
        <label>Personas<input name="guests" type="number" min="1" max="8" value={f.guests} onChange={change} /></label>
        <label>Fecha<input name="date" type="date" value={f.date} onChange={change} /></label>
      </div>
      <label>Hora
        <select name="time" value={f.time} onChange={change}>
          <option value="">Selecciona</option>
          {SLOTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label>Mesa disponible
        <select name="table" value={f.table} onChange={change} disabled={!avail.length}>
          <option value="">{f.time ? (avail.length ? 'Selecciona' : 'Sin mesas libres') : 'Elige hora primero'}</option>
          {avail.map((t) => <option key={t.id} value={t.id}>Mesa {t.id} ({t.seats} personas)</option>)}
        </select>
      </label>
      <button type="submit">Reservar</button>
      {msg && <p role="status" className={msg.ok ? 'ok' : 'err'}>{msg.t}</p>}
    </form>
  );
}
