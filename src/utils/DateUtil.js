import moment from 'moment';
import momentTimezone from 'moment-timezone';

const defaultStartDate = moment().add(-6, 'months');
const defaultEndDate = moment().add(3, 'months');

const formattedStartDate = defaultStartDate.format('YYYY-MM-DD');
const formattedEndDate = defaultEndDate.format('YYYY-MM-DD');

const dateUtil = {
  organizeLaunchTime(launchTime) {
    if (!launchTime) {
      return 'TBD';
    }

    return momentTimezone(launchTime).tz('Etc/GMT+3').format('LLLL');
  }
};

export { defaultStartDate, defaultEndDate, formattedStartDate, formattedEndDate, dateUtil };
