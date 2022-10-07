import Link from "next/link";
import Header from "../pure_elements/Header";

interface MainProps {
  children: React.ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <div className="main-layout-wrapper">
      <div>
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Main;
