
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.fr.e30e6012862c27821122.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/578.baseline.fr.2aedb27d793a387cb709.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/81.baseline.fr.8de6ba006061de96c9ad.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/598.baseline.fr.b83d3cf07bb65267768a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.fr.b0831d180bcb60edd216.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/731.baseline.fr.68ceefcc66cfc32ca175.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/645.baseline.fr.65501fee101bd1f9018b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/917.baseline.fr.88daeefe46c532f2180e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/844.baseline.fr.2bcddb1bebd8d00bde9a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/Redesign.baseline.fr.d9b856046c320c830265.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/578.baseline.fr.6ba5472cfd3764613c2a.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.fr.a3984c31989d09f92fc0.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/645.baseline.fr.fcbc2fd715e9ca8ff659.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/661.baseline.fr.9de3834b44f0bf5102c6.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  