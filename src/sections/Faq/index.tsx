import { Typography } from "@ht6/react-ui";
import PageSection from "../../components/PageSection";
import AccordionGroup from "../../components/AccordionGroup";
import data from "./Faq.data";
import { faqs, container, title } from "./Faq.module.scss";

function Faq() {
  return (
    <PageSection className={container}>
      <Typography
        className={title}
        id="faq"
        textType="heading1"
        textColor="shades-0"
        textWeight="extra-bold"
        as="h2"
      >
        Frequently Asked Questions
      </Typography>
      <div className={faqs}>
        {data.map(({ category, questions }, key) => (
          <AccordionGroup
            heading={category}
            headingProps={{
              as: "h4",
            }}
            items={questions.map((question) => ({
              label: question.question,
              content: question.answer,
            }))}
            key={key}
          />
        ))}
      </div>
    </PageSection>
  );
}

export default Faq;
