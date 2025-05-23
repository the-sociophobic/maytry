import Script from 'next/script'

import QueryWrapper from './lib/components/QueryWrapper'
import { ScrollToWrapper } from './lib/components/ScrollTo'
import AppLayout from './lib/components/AppLayout'
import { StoreProvider } from './lib/hooks/useStore/StoreProvider'

import '@/app/lib/assets/styles/index.sass'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <head>
        <Script type="text/javascript" src="//points.boxberry.ru/js/boxberry.js" />
        <Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js" />
      </head>
      <body>
        <QueryWrapper>
          <StoreProvider>
            <ScrollToWrapper>
              <AppLayout>
                {children}
              </AppLayout>
            </ScrollToWrapper>
          </StoreProvider>
        </QueryWrapper>

        <Script type="text/javascript" >
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(95223283, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayerYandex"
          });
        `}
        </Script>

        <Script type="text/javascript">
        {`
          var _tmr = window._tmr || (window._tmr = []);
          _tmr.push({id: "3609099", type: "pageView", ecommerce: "dataLayerVK", start: (new Date()).getTime()});
          (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
          })(document, window, "tmr-code");
        `}
        </Script>

        <Script type="text/javascript">
        {`
          // if (typeof window !== 'undefined') {
          //   const sheet = new CSSStyleSheet()
          //   sheet.replaceSync('.server-only { display: none !important; }')
          //   document.adoptedStyleSheets = [sheet]
          // }
            
          // if (typeof document !== 'undefined') {
          //   [...document.getElementsByTagName('div')]
          //     .filter(element => element.className.includes('server-only'))
          //     .forEach(element => element.setAttribute('style', 'display: none !important'))
          // }
        `}
        </Script>
        
      </body>
    </html>
  )
}
