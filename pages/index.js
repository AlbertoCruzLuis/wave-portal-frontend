import { TextArea } from '../components/TextArea';
import { WalletButton } from '../components/WalletButton';
import { WaveList } from '../components/WaveList';
import { useWallet } from '../hooks/useWallet';
import { TwitterFollowButton } from 'react-twitter-embed';

export default function Home() {
  const {
    totalWaves,
    waveList,
    sendWave
  } = useWallet()

  return (
    <div className='grid gap-4 max-w-xs'>
      <h2 className='text-white text-3xl font-bold text-center'>Wave at Alberto</h2>
      <div className='flex justify-center'>
        <TwitterFollowButton
          screenName={'AlbertoCruzdev'}
          options={{ showCount: false }}
        />
      </div>
      <div className='flex justify-center'>
        <WalletButton />
      </div>
      <TextArea sendWave={sendWave} />
      <WaveList waveList={waveList} totalWaves={totalWaves} />
    </div>
  )
}
