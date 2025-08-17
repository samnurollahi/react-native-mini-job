import moment from "moment-jalaali";

export default function(date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format("jYYYY/jMM/jDD");
}