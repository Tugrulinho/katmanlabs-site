import FloatingMeetingButton from "./components/FloatingMeetingButton";
import ScrollToTop from "./components/ScrollToTop";
import PublicRoutes from "./routes/PublicRoutes";

export default function PublicApp() {
  return (
    <>
      <ScrollToTop />
      <PublicRoutes />
      <FloatingMeetingButton />
    </>
  );
}
