import MainHeader from "../components/MainHeader";
import MainBody from "../components/MainBody";

export default function DashboardLayout({ children }) {
  return (
    <>
      <MainHeader />
      <MainBody>
        {children}
      </MainBody>
    </>
  );
}
