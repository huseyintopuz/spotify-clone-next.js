import type { NextPage } from 'next'
import Head from 'next/head'
import Center from './playlist/playlist'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spotify</title>
      </Head>
      <Center />
    </div>
  )
}
export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  }
}


