import type {AppProps} from 'next/app'

export default function MyApp({Component, pageProps}: AppProps) {
    return <DevSupport ComponentPreviews={ComponentPreviews}
                       useInitialHook={useInitial}
    >
        <Component {...pageProps} />
    </DevSupport>
}