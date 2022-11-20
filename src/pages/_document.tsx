import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" style={{ '--100vh': '100vh', '--vh': '1vh' } as any}>
      <Head />
      <body>
        {/* Polyfill of Object.hasOwn */}
        <script
          dangerouslySetInnerHTML={{
            __html: `"function"!=typeof Object.hasOwn&&(Object.hasOwn=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)});`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
