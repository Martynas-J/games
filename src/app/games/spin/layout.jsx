import HeaderSpin from "./components/header/header";
export const metadata = {
  title: "Spin Game",
  description: "Generated by create next app",
};
export default function RootLayoutSpin({ children }) {
  return (
    <>
      <HeaderSpin />
      <div className="text-center p-6 pt-0 bg-gray-100 rounded-lg shadow-md w-[360px] mx-auto">
        {children}
      </div>
    </>
  );
}
