export type DateFormat =
  | 'db'        // YYYY-MM-DD (para SQLite)
  | 'display'  // DD/MM/YYYY (usuario)
  | 'iso';     // ISO sin bug de timezone

export function formatDate(
  value: Date | string,
  format: DateFormat = 'display'
): string {
  const date = typeof value === 'string' ? new Date(value) : value;

  switch (format) {
    case 'db':
      // Para guardar en DB (NO depende del timezone)
      return date.toISOString().split('T')[0];

    case 'iso':
      // ISO sin hora (seguro)
      return date.toLocaleDateString('en-CA', {
        timeZone: 'UTC',
      });

    case 'display':
    default:
      // Para mostrar al usuario (hora local)
      return date.toLocaleDateString('es-CO');
  }
}