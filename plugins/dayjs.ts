import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'

export default defineNuxtPlugin(() => {
    dayjs.extend(isLeapYear)
    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
    dayjs.extend(updateLocale)

    return {
        provide: {
            dayjs,
        },
    }
})
