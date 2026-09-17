# Google Analytics & Search Console setup (TEB website)

## 1) Put IDs in website env

Edit `website/.env.local` (and production env):

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GSC_VERIFICATION=paste_verification_token_here
```

Rebuild/redeploy the website after changing these.

## 2) Google Analytics (GA4)

1. Open https://analytics.google.com/ with an owner account
2. Create a GA4 property for `tebpestcontrol.com` (or use existing)
3. Admin → Data streams → Web → copy **Measurement ID** (`G-...`)
4. Paste into `VITE_GA_MEASUREMENT_ID`
5. **Share access** to `dmmdoesinfo.analytics@gmail.com`:
   - Admin → Property access management → Add users
   - Email: `dmmdoesinfo.analytics@gmail.com`
   - Role: **Viewer** (or Editor if they need to change settings)

## 3) Google Search Console

1. Open https://search.google.com/search-console with an owner account
2. Add property: URL prefix `https://tebpestcontrol.com`
3. Choose **HTML tag** verification → copy the `content="..."` value only
4. Paste into `VITE_GSC_VERIFICATION` and redeploy
5. Click Verify in Search Console
6. Submit sitemap: `https://tebpestcontrol.com/sitemap.xml`
7. **Share access** to `dmmdoesinfo.analytics@gmail.com`:
   - Settings → Users and permissions → Add user
   - Email: `dmmdoesinfo.analytics@gmail.com`
   - Permission: **Full** or **Restricted**

## Notes

- Standard robots URL is `/robots.txt` (also available as `/robot.txt` as requested)
- Sitemap lists home, services, gallery, blogs + published service/blog pages (API)
- Access cannot be granted from code — only from the Google account that owns GA/GSC
