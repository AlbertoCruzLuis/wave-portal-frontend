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
            </Head>

            <main>
                {children}
            </main>
        </div>
    )
}