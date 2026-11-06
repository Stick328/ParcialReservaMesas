# Reservas de mesas para restaurantes

Aplicación web hecha con **React + Vite** para registrar reservas de mesas sin duplicaciones, ver el calendario de ocupación y usarla desde móvil o escritorio.

## Integrantes
- Alex Andre Santiago Navarro


## Enlaces
- Prototipo en Figma: [https://www.figma.com/design/strMXwFcATICtEPA5d7kyp/Untitled?node-id=0-1&t=ihr29SPZFSTW8S0d-1]

## Requisitos
- Node.js 18 o superior y npm

## Instalación y ejecución
```bash
git clone [URL-del-repositorio]
cd reservas-restaurante
npm install
npm run dev        # abre http://localhost:5173
```
Compilar para producción: `npm run build` y `npm run preview`.

## Cómo probar
1. Elige un día en el calendario (los días se colorean según la demanda).
2. Completa el formulario: nombre, celular (9 dígitos), personas, hora.
3. Solo aparecen las mesas libres y con capacidad suficiente para ese horario.
4. Reserva la misma mesa en un horario que se cruce (cada reserva dura 2 h): la mesa ya no se ofrece, por lo que no hay duplicaciones.
5. Cambia entre vista **Administrador** (ve datos y puede cancelar) y **Cliente** (solo ve ocupación).
6. Recarga la página: las reservas se conservan (localStorage).

## Estructura
- `src/App.jsx`: estado global (`useState`) y persistencia (`useEffect`).
- `src/components/ReservationForm.jsx`: formulario; `useEffect` recalcula mesas libres en tiempo real.
- `src/components/Calendar.jsx`: calendario interactivo mensual.
- `src/components/ReservationList.jsx`: reservas del día seleccionado.
- `src/utils.js`: regla de conflictos (solapamiento de horarios por mesa).
