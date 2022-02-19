import { Wave } from "../Wave"
import { formatDate } from "../../utils/date"
import { useEffect, useState } from "react"


export const WaveList = ({ waveList, totalWaves }) => {
    const [firstWaveEachDay, setFirstWaveEachDay] = useState(new Map())

    useEffect(() => {
        // Clear all data
        setFirstWaveEachDay(new Map())

        if (waveList && waveList.length) {
            const uniqueDates = new Set()
            const waveIds = new Map()
            for (const {id, timestamp} of waveList) {
                const date = formatDate(timestamp)
                if (uniqueDates.has(date)) {
                    waveIds.set(id, false)
                } else {
                    uniqueDates.add(date)
                    waveIds.set(id, true)
                }
            }
            setFirstWaveEachDay(waveIds)
        }
    }, [waveList])

    return (
        <div className="flex flex-col gap-3">
            {totalWaves && (
                <div className="flex gap-2">
                    <div className="flex justify-center rounded-full bg-purple-500 w-6">
                        <span className="font-bold">{totalWaves}</span>
                    </div>
                    <span className="text-white font-bold">Waves</span>
                </div>
            )}
            {waveList && waveList.map(({id, from, message, timestamp}) => {
                return (
                    <>
                        {firstWaveEachDay.get(id) && (
                            <div key={timestamp} className="flex flex-col text-gray-200 max-w-max rounded-md p-2">
                                <span className="font-bold">{formatDate(timestamp)}</span>
                            </div>
                        )}

                        <Wave 
                            key={id}
                            from={from}
                            message={message}
                            timestamp={timestamp} 
                        />
                    </>
                )}
            )}
        </div>
    )
}