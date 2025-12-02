export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const og   = `${baseUrl}/api/og`;
  const open = `https://basemetrics.vercel.app`;
  const post = `${baseUrl}/api/frame-tx`;

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta property='og:title' content='Base Analytics Mini-App'/>
        <meta property='og:description' content='Live Base & OP Stack metrics + EVM TVL Top 10'/>
        <meta property='og:image' content='${og}'/>

        <meta name='fc:frame' content='vNext'/>
        <meta name='fc:frame:image' content='${og}'/>

        <meta name='fc:frame:button:1' content='Open Dashboard'/>
        <meta name='fc:frame:button:1:action' content='web'/>
        <meta name='fc:frame:button:1:target' content='${open}'/>

        <meta name='fc:frame:button:2' content='Base Docs'/>
        <meta name='fc:frame:button:2:action' content='web'/>
        <meta name='fc:frame:button:2:target' content='https://docs.base.org/'/>

        <meta name='fc:frame:button:3' content='Tip on Base'/>
        <meta name='fc:frame:button:3:action' content='tx'/>

        <meta name='fc:frame:post_url' content='${post}'/>
      </head>
      <body style="margin:0;padding:0;">
        <iframe
          src="https://basemetrics.vercel.app"
          style="border:0; width:100vw; height:100vh; display:block;"
        ></iframe>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  });
}
