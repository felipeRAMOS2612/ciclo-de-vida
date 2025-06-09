export function isSameWeek(date1, date2) {
    const first = new Date(date2);
    first.setDate(date2.getDate() - date2.getDay());

    const last = new Date(first);
    last.setDate(first.getDate() + 6);

    return date1 >= first && date1 <= last;
}