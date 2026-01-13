import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation({ namespace: "ui" });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEOHead
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist. Return to INVESTOPATRONUS homepage to explore financial markets, news, analytics, and educational resources."
        noindex={true}
      />
      <div className="section-spacing">
        <div className="container-narrow text-center">
          <h1 className="heading-xl mb-4">{t("notFound.title")}</h1>
          <p className="body-lg mb-8">{t("notFound.message")}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("notFound.backHome")}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;