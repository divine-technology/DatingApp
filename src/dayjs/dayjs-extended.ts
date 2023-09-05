import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isToday);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default dayjs;
