import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(isLeapYear)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)


export default defineNuxtPlugin(() => {
	provide: {
		dayjs
	}
})
