import HeroImage from "../components/HeroImage.tsx";
import PageContent from "../components/PageContent.tsx";
import PageSection from "../components/PageSection.tsx";
import "../index.css";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import FeaturedContent from "../components/FeaturedContent.tsx";
import Layout from "../components/Layout.tsx";
import SolutionList from "../components/SolutionListItem.tsx";
import { execute } from "../graphql/execute.ts";
import { GetLandingPageQuery } from "../queries/getLandingPage.ts";

const LandingPage: FC = () => {
  const landingPage = useQuery({
    queryKey: ["landing_page"],
    queryFn: async () => {
      const res = await execute(GetLandingPageQuery);
      return res.data.landingPage_All.items[0];
    },
  });

  if (!landingPage.data) {
    return (
      <Layout>
        <div className="grow" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grow">
        <PageSection color="bg-creme">
          <HeroImage
            data={{
              headline: landingPage.data.headline,
              subheadline: landingPage.data.subheadline,
              heroImage: landingPage.data.heroImage.items[0],
            }}
          />
        </PageSection>
        <PageSection color="bg-white">
          <SolutionList />
        </PageSection>
        {!!landingPage.data.bodyCopy && (
          <PageSection color="bg-white">
            <PageContent body={landingPage.data.bodyCopy} />
          </PageSection>
        )}
        {!!landingPage.data.featuredContent && (
          <FeaturedContent featuredContent={landingPage.data.featuredContent} />
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
