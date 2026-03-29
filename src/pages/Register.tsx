import Navbar from "@/components/Navbar";
import RegistrationSection from "@/components/RegistrationSection";
import FooterSection from "@/components/FooterSection";

const Register = () => (
  <div className="min-h-screen text-white">
    <Navbar />
    <div className="pt-24">
      <RegistrationSection />
    </div>
    <FooterSection />
  </div>
);

export default Register;
