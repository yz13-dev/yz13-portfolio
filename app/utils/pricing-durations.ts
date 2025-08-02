


export const formatDuration = (duration: number[]) => {

  const isAllMoreThanWeek = duration.every(day => day >= 7);
  const isLessThanWeek = duration.every(day => day < 7);
  const isMoreThanMonth = duration.every(day => day >= 30);

  if (isMoreThanMonth) {
    return duration.map(day => day === 30 ? '1 месяца' : `${day} месяцев`).join('-');
  }

  if (isLessThanWeek) {
    return duration.map(day => day === 1 ? '1 дня' : `${day} дней`).join('-');
  }

  if (isAllMoreThanWeek) {
    return duration.map(day => day === 7 ? '1 недели' : `${day} недель`).join('-');
  }

  return [];
}
