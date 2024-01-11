import Link from "next/link";

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <div className=" text-center text-blue-500 hover:text-blue-700 px-4 py-2 cursor-pointer rounded-full bg-blue-100 hover:bg-blue-200">
        {children}
      </div>
    </Link>
  );
};

export default NavLink;
