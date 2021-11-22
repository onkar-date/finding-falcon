export function sortData(rows: Array<any>, sortBy: string, order: string) {
    let count = 0;
    rows.sort((a, b) => {
        count += 1;
        if (sortBy === 'Name')  {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return order === 'asc' ? -1 : 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        } else {
            const firstValue = Number( a.totals[sortBy.toLowerCase()]);
            const secondValue = Number(b.totals[sortBy.toLowerCase()]);
            if (firstValue < secondValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (firstValue > secondValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        }
    });
}
