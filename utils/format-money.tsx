export const CURRENCY = {
  locale: 'es-CO',
  code: 'COP',
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    minimumFractionDigits: 0,
  }).format(value);
}