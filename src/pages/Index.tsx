import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import UploadSection from "@/components/UploadSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DashboardSection />
      <UploadSection />
    </div>
  );
};

export default Index;
