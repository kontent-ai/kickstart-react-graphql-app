import type { FC } from "react";
import type { GetLandingPageQueryQuery } from "../graphql/graphql.ts";
import Divider from "./Divider.tsx";
import FeaturedArticle from "./FeaturedArticle.tsx";
import FeaturedEvent from "./FeaturedEvent.tsx";
import PageSection from "./PageSection.tsx";

type FeaturedContentProps = {
  featuredContent: GetLandingPageQueryQuery["landingPage_All"]["items"][0]["featuredContent"];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const featuredArticle = featuredContent.items.find((item) => item.__typename === "Article");
  const featuredEvent = featuredContent.items.find((item) => item.__typename === "Event");

  return (
    <>
      {(!!featuredArticle || !!featuredEvent) && (
        <h2 className="text-6xl text-azure text-center">Featured Content</h2>
      )}
      {!!featuredArticle && (
        <PageSection color="bg-creme">
          <FeaturedArticle article={featuredArticle} />
        </PageSection>
      )}

      {!!featuredArticle && !!featuredEvent && <Divider />}

      {!!featuredEvent && (
        <PageSection color="bg-white">
          <FeaturedEvent event={featuredEvent} />
        </PageSection>
      )}
    </>
  );
};

export default FeaturedContent;
