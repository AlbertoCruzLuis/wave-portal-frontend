import { formatTime } from "../../utils/date"
import { BiWallet, BiCoinStack } from "react-icons/bi"
import { middleStringTruncate } from 'utils/middleStringTruncate';

export const Wave = ({from, message, timestamp, isRewarded}) => {
    return (
        <div className="">
            <div className=" bg-gray-400 rounded-md p-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div className="flex items-center">
                            <BiWallet size="0.9rem" />
                        </div>
                        <span className="text-sm">{middleStringTruncate(from, 6, 6)}</span>
                    </div>
                    { isRewarded && <BiCoinStack /> }
                </div>
                <div className="flex justify-between">
                        <span>{message}</span>
                        <div className="flex items-between">
                            <span className="text-sm text-gray-600 text-end">{formatTime(timestamp)}</span>
                        </div>
                </div>
            </div>
        </div>
    )
}