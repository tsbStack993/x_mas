// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://*.supabase.co https://*.supabase.com;
              frame-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};
