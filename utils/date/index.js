import dayjs from "dayjs"

export const formatDate = (timestamp) => {
	return dayjs(timestamp).format("MMM D, YYYY")
}

export const formatTime = (timestamp) => {
	return dayjs(timestamp).format("HH:mm")
}