import React, { useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ResumeDossierModal } from './components/ResumeDossierModal';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { ProjectCaseStudy } from './types';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--txt)] font-body selection:bg-[#ff7a29] selection:text-[#0b0b0e] relative overflow-x-hidden transition-colors duration-500">
      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Sections */}
      <main id="app" className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onOpenCaseStudy={(proj) => setSelectedProject(proj)} />
        <JourneySection />
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      <Toast message={toastMessage} isVisible={isToastVisible} />

      {/* Resume Modal */}
      <ResumeDossierModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
