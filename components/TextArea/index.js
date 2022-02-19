import { useState } from 'react'
import { GrEmoji } from "react-icons/gr"
import Popup from 'reactjs-popup'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export const TextArea = ({ sendWave }) => {
    const [textInput, setTextInput] = useState("")
    const [textCount, setTextCount] = useState(0)
    const MAX_CHARACTER = 100

    const onEmojiClick = (event, emojiObject) => {
        if (textCount < MAX_CHARACTER) {
            setTextCount(textCount + 1)
            setTextInput(textInput + emojiObject.emoji)
        }
    }

    const textChange = (event) => {
        setTextInput(event.target.value)
        setTextCount(event.target.value.length)
    }

    const sendWaveClick = () => {
        if (!textInput) {
            toast.error("You have that write a message")
            return
        }
        sendWave(textInput)

    }

    return (
        <>
            <div className='p-2 bg-white rounded-md'>
                <textarea className='rounded-md resize-none outline-none'
                    rows={3}
                    cols={32}
                    maxLength={MAX_CHARACTER}
                    value={textInput}
                    onChange={textChange}
                    placeholder="Write a message"
                />
                <div className='flex justify-between gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex items-center'>
                            <Popup trigger={<button className='hover:bg-sky-100 p-2 rounded-full'> <GrEmoji color='steelblue'/></button>} position="bottom center">
                                <Picker onEmojiClick={onEmojiClick} />
                            </Popup>
                        </div>
                        <span className='text-sky-600 flex items-center'>{textCount} / {MAX_CHARACTER}</span>
                    </div>
                    <button className='bg-sky-600 p-2 rounded-md text-white' onClick={sendWaveClick}>Send Wave</button>
                </div>
            </div>
        </>
    )
}