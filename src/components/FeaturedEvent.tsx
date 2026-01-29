import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { PortableText } from "@kontent-ai/rich-text-resolver/utils/react";
import type { FC } from "react";
import type { EventFragment } from "../graphql/graphql.ts";
import { formatDate } from "../utils/date.ts";
import { defaultPortableRichTextResolvers } from "../utils/richtext.tsx";
import FeaturedComponentBase from "./FeaturedComponentBase.tsx";

type FeaturedEventProps = Readonly<{
  event: EventFragment;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ event }) => {
  const createTag = (text: string) => (
    <div key={text} className="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p className="text-[#1D1D1B] text-lg">{text}</p>
    </div>
  );

  const shouldRender = Object.entries(event).length > 0;

  return shouldRender ? (
    <FeaturedComponentBase image={event.image.items[0]} type="event">
      <div>
        {!!event.name && (
          <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
            {event.name}
          </h2>
        )}
        {!!event.startDate_with_timezone?.value && (
          <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
            {`${
              event.startDate_with_timezone.value?.length
                ? formatDate(event.startDate_with_timezone.value)
                : ""
            }${
              event.endDate_with_timezone?.value?.length
                ? ` - ${formatDate(event.endDate_with_timezone.value)}`
                : ""
            }`}
          </p>
        )}
        <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
          {event.eventType.items.map((t) => createTag(t._system_.name.toUpperCase()))}
          {event.eventTopic.items.map((t) => createTag(t._system_.name.toUpperCase()))}
        </div>
        {!!event.description.html && (
          <div className="mt-4">
            <PortableText
              value={transformToPortableText(event.description.html)}
              components={defaultPortableRichTextResolvers}
            />
          </div>
        )}
      </div>
      {event.description.html !== "<p><br></p>" && (
        <a
          href="#"
          className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline"
        >
          Read more
        </a>
      )}
    </FeaturedComponentBase>
  ) : null;
};

export default FeaturedEvent;
