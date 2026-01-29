import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import {
  PortableText,
  type PortableTextReactResolvers,
} from "@kontent-ai/rich-text-resolver/utils/react";
import type { FC } from "react";
import type { GetLandingPageQueryQuery } from "../graphql/graphql.ts";
import { defaultPortableRichTextResolvers } from "../utils/richtext.tsx";
import Video from "./Video.tsx";

type PageContentProps = {
  body: GetLandingPageQueryQuery["landingPage_All"]["items"][0]["bodyCopy"];
};

const PageContent: FC<PageContentProps> = ({ body }) => {
  const portableText = transformToPortableText(body.html);

  return (
    <div className="pt-[104px] pb-40 flex flex-col gap-8">
      <PortableText value={portableText} components={createPortableTextComponents(body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: GetLandingPageQueryQuery["landingPage_All"]["items"][0]["bodyCopy"],
): PortableTextReactResolvers => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value }) => {
      const item = element.components.items.find(
        (item) => item._system_.codename === value.componentOrItem._ref,
      );
      if (!item) {
        return <div>Did not find any item with codename {String(value.componentOrItem._ref)}</div>;
      }

      return <Video video={item} />;
    },
  },
});

export default PageContent;
