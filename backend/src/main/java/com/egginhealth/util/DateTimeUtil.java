package com.egginhealth.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    private DateTimeUtil() {

    }

    public static LocalDateTime getStringToDateTime(String strDate){
        return formatDateTime(strDate,"yyyy-MM-dd'T'HH:mm:ss");
    }

    public static LocalDateTime formatDateTime(String strDate, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return LocalDateTime.parse(strDate.replace("Z",""), formatter);
    }

    public static String getDateTimeToString(LocalDateTime dateTime){
        return formatString(dateTime,"yyyy-MM-dd'T'HH:mm:ss");
    }

    public static String formatString(LocalDateTime dateTime, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return dateTime.format(formatter);
    }

}