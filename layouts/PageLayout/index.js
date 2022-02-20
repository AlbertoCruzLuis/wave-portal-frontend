import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

export const PageLayout = ({ children }) => {
    return (
        <div className="flex justify-center pt-10 pb-10 font-Poppins min-h-screen bg-gray-800">
            <Toaster position='bottom-center' toastOptions={{
                duration: 3000,
            }} />
            <Head>
                <title>Wave at Alberto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="title" content="Wave at Alberto" />
                <meta name="description" content="Web3 Dapp build with Nextjs and TailwindCSS. Course of Build a Web3 App with Solidity + Ethereum Smart Contracts." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://waveportalweb3.vercel.app/" />
                <meta property="og:title" content="Wave at Alberto" />
                <meta property="og:description" content="Web3 Dapp build with Nextjs and TailwindCSS. Course of Build a Web3 App with Solidity + Ethereum Smart Contracts." />
                <meta property="og:image" content="https://gateway.pinata.cloud/ipfs/QmQja9VP7KdwvombhUeZV9pPfmRgrNiwR1U6VHb6BHJKBY" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://waveportalweb3.vercel.app/" />
                <meta property="twitter:title" content="Wave at Alberto" />
                <meta property="twitter:description" content="Web3 Dapp build with Nextjs and TailwindCSS. Course of Build a Web3 App with Solidity + Ethereum Smart Contracts." />
                <meta property="twitter:image" content="https://gateway.pinata.cloud/ipfs/QmQja9VP7KdwvombhUeZV9pPfmRgrNiwR1U6VHb6BHJKBY" />
            </Head>

            <main>
                {children}
            </main>
        </div>
    )
}