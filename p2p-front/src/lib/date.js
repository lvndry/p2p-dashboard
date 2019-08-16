
import moment from 'moment';

export function getDates(startDate, endDate) {
    const dateArray = [];
    let sdate = moment(startDate);
    let edate = moment(endDate);
    while (sdate <= edate) {
        dateArray.push( moment(sdate).format('YYYY-MM-DD'))
        sdate = moment(sdate).add(1, 'days');
    }
    return dateArray;
}
