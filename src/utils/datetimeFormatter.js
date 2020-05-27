import moment from 'moment';

export default (str) => moment(String(str)).format('YYYY年MM月DD日 hh:mm:ss');
