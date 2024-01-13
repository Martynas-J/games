import DbSpinGame from "./components/allDataSpinGame/dbSpinGame";
import HeaderSpin from "./components/header/header";

export const metadata = {
  title: "Spin Game",
  description: "Generated by create next app",
};
export default function RootLayoutSpin({ children }) {
  return (
    <div>
      <div className="flex justify-center flex-col md:flex-row">
        <div>
          <HeaderSpin />
          <div className="text-center p-6 pt-0 bg-gray-100 rounded-b-lg shadow-md w-[360px] mx-auto">
            {children}
          </div>
        </div>
        <DbSpinGame />
      </div>
    </div>
  );
}
