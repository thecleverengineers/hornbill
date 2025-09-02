import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SEOData {
  title?: string;
  meta_description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  canonical_url?: string;
  robots?: string;
}

interface GlobalSEOData {
  site_name?: string;
  default_og_image?: string;
  google_analytics_id?: string;
  google_tag_manager_id?: string;
  facebook_pixel_id?: string;
  twitter_handle?: string;
  facebook_app_id?: string;
  verification_google?: string;
  verification_bing?: string;
}

export function SEOHead() {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [globalData, setGlobalData] = useState<GlobalSEOData | null>(null);

  useEffect(() => {
    fetchSEOData();
  }, [location.pathname]);

  const fetchSEOData = async () => {
    try {
      // Fetch page-specific SEO
      const { data: pageData } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('page_route', location.pathname)
        .single();

      if (pageData) {
        setSeoData(pageData);
      }

      // Fetch global SEO settings
      const { data: globalSettings } = await supabase
        .from('global_seo_settings')
        .select('*')
        .single();

      if (globalSettings) {
        setGlobalData(globalSettings);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    }
  };

  const title = seoData?.title || 'Hornbill Music Festival';
  const description = seoData?.meta_description || globalData?.site_name || '';
  const keywords = seoData?.keywords || '';
  const ogTitle = seoData?.og_title || title;
  const ogDescription = seoData?.og_description || description;
  const ogImage = seoData?.og_image || globalData?.default_og_image || '';
  const twitterCard = seoData?.twitter_card || 'summary_large_image';
  const canonicalUrl = seoData?.canonical_url || window.location.href;
  const robots = seoData?.robots || 'index, follow';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {globalData?.site_name && <meta property="og:site_name" content={globalData.site_name} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {globalData?.twitter_handle && <meta name="twitter:site" content={globalData.twitter_handle} />}

      {/* Facebook App ID */}
      {globalData?.facebook_app_id && <meta property="fb:app_id" content={globalData.facebook_app_id} />}

      {/* Site Verification */}
      {globalData?.verification_google && <meta name="google-site-verification" content={globalData.verification_google} />}
      {globalData?.verification_bing && <meta name="msvalidate.01" content={globalData.verification_bing} />}

      {/* Google Analytics */}
      {globalData?.google_analytics_id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${globalData.google_analytics_id}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${globalData.google_analytics_id}');
            `}
          </script>
        </>
      )}

      {/* Google Tag Manager */}
      {globalData?.google_tag_manager_id && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalData.google_tag_manager_id}');
          `}
        </script>
      )}

      {/* Facebook Pixel */}
      {globalData?.facebook_pixel_id && (
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${globalData.facebook_pixel_id}');
            fbq('track', 'PageView');
          `}
        </script>
      )}
    </Helmet>
  );
}