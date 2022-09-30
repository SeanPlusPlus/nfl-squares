import Head from 'next/head'

const Header = () => {
  return (
    <Head>
      <title>NFL Squares</title>
      <meta name="description" content="Menu XYZ" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://menuxyz.vercel.app/" />
      <meta property="og:title" content="Menu XYZ" />
      <meta property="og:description" content="Blockchain powered restaurant menus" />
      <meta property="og:image" content="https://pbs.twimg.com/profile_images/1575972421735133184/iW-8VYYS_400x400.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value="menuxyz.vercel.app" />
      <meta name="twitter:title" value="Menu XYZ" />
      <meta name="twitter:description" value="Blockchain powered restaurant menus" />
      <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1575972421735133184/iW-8VYYS_400x400.jpg" />
      <meta name="twitter:url" value="https://menuxyz.vercel.app/" />
    </Head>
  )
}

export default Header
