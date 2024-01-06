import Image from "next/image";
import NavLink from "../Link/Link";

const Card = ({ title, description, href, src }) => {
  return (
    <div className="text-center bg-white shadow-lg rounded-lg p-4 mb-4 max-w-xs ">
      <Image
        src={src}
        width={300}
        height={300}
        alt="Quiz"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 pb-3">{description}</p>
      <NavLink href={href} className="mt-2 text-blue-500 hover:text-blue-700">
        Žaisti
      </NavLink>
    </div>
  );
};

export default Card;
