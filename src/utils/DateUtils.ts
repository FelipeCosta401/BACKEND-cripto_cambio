import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default class DateUtils {

    static toBRT(rawDate: Date | string) {
        return dayjs(rawDate).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss");
    }

}