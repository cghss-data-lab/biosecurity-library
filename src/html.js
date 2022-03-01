import React from 'react'
import PropTypes from 'prop-types'

import { siteMetadata, plugins } from '../gatsby-config'

export default function HTML(props) {
  let { cookieMessage, buttonColor, backgroundColor } =
    siteMetadata.cookieConsent

  const { trackingId } = plugins.find(
    p => typeof p !== 'string' && p.resolve === `gatsby-plugin-gtag`
  ).options

  // if (trackingId === 'G-XXXXXXXXXX')
  //   console.info(`Google Analytics not configured`)
  // else console.info(`Google Analytics tag: ${trackingId}`)

  return (
    <html {...props.htmlAttributes} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
        />
        {props.headComponents}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` 
              window.dataLayer = window.dataLayer || [];
              window["ga-disable-${trackingId}"] = true;`,
          }}
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          data-cfasync="false"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          /**
           * If consent is given for cookies, add gtag cookies
           * @method setupGA
           * @return {[type]} [description]
           */
          function setupGA(allowed) {
            if (!allowed) {
              window["ga-disable-${trackingId}"] = true;
            } else {
              window["ga-disable-${trackingId}"] = false;
              /**
               * Helper function for defining gtag cookies
               * @method gtag
               * @return {[type]} [description]
               */
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "${trackingId}");
            }
          }
          window.cookieconsent.initialise({
            palette: {
              popup: {
                background: "${backgroundColor}",
              },
              button: {
                background: "${buttonColor}",
              }
            },
            autoOpen: true,
            position: "bottom-right",
            type: "opt-in",
            content: {
              message: "${cookieMessage}"
            },
            hasTransition: false,
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
            onInitialise: function(status) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onStatusChange: function(status, chosenBefore) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onRevokeChoice: function() {
              var type = this.options.type;
              if (type == "opt-in") {
                // disable cookies
                setupGA(false);
              }
              if (type == "opt-out") {
                // enable cookies
                setupGA(true);
              }
            }
          });`,
          }}
        ></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
