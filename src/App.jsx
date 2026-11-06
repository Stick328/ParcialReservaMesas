import { useState, useEffect } from 'react';
import Calendar from './components/Calendar.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import ReservationList from './components/ReservationList.jsx';
import { todayISO } from './utils';

const load = () => {
  try { return JSON.parse(localStorage.getItem('reservas')) || []; } catch { return []; }
};

export default function App() {
  const [reservations, setReservations] = useState(load);
  const [selected, setSelected] = useState(todayISO());
  const [admin, setAdmin] = useState(true);


  useEffect(() => { localStorage.setItem('reservas', JSON.stringify(reservations)); }, [reservations]);

  const add = (r) => setReservations((p) => [...p, r]);
  const cancel = (id) => setReservations((p) => p.filter((r) => r.id !== id));

  return (
    <>
      <header>
        <h1>🍽️ Reservas de mesas</h1>
        <div className="toggle" role="group" aria-label="Tipo de vista">
          <button type="button" className={admin ? 'on' : ''} onClick={() => setAdmin(true)}>Administrador</button>
          <button type="button" className={!admin ? 'on' : ''} onClick={() => setAdmin(false)}>Cliente</button>
        </div>
      </header>
      <main>
        <Calendar reservations={reservations} selected={selected} onSelect={setSelected} />
        <ReservationForm reservations={reservations} onAdd={add} date={selected} />
        <ReservationList items={reservations.filter((r) => r.date === selected)} admin={admin} onCancel={cancel} date={selected} />
      </main>
    </>
  );
}
