import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bg: string;
}
const Card = ({ children, bg }: CardProps) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;
