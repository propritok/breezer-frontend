import React from "react";

interface MailAdressProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const MailAdress: React.FC<MailAdressProps> = ({ className = "" }) => {
  const mail = process.env.NEXT_PUBLIC_MAIL_ADDRESS || "";
  const mailHref = `mailto:${mail}`;

  return (
    <a href={mailHref} className={className}>
      {mail}
    </a>
  );
};

export default MailAdress;
