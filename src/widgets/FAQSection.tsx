import { FAQ } from '@/features';

interface FAQSectionProps {
  title?: string;
  maxQuestions?: number;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, maxQuestions, className = '' }) => {
  return (
    <div className={className}>
      <FAQ title={title} maxQuestions={maxQuestions} />
    </div>
  );
};

export default FAQSection;
