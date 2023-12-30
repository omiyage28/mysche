import moment from "moment";
import "moment/locale/ja";

export default {
  formatDate(date) {
    if (!date) return "";
    return moment(date).format("YYYY年MM月DD日(dd)");
  },
  formatTime(time) {
    if (!time) return "";
    return moment.utc(time).format("HH:mm");
  },
};
