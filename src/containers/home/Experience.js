import React, { useState, lazy, Suspense } from "react";
// import EperienceCard from "../../components/Experience/EperienceCard";
import { CTab, CTabContent, CTabList, CTabs, CTabPanel, CSpinner } from "@coreui/react";
// import EducationCard from "../../components/Experience/EducationCard";
// import Skills from "../../components/Experience/Skills";

const EperienceCard = lazy(
  () => import("../../components/Experience/EperienceCard")
);
const EducationCard = lazy(
  () => import("../../components/Experience/EducationCard")
);
const Skills = lazy(() => import("../../components/Experience/Skills"));

const Experience = () => {
  const [activeKey, setActiveKey] = useState("experience");
  return (
    <>
      <CTabs activeItemKey={activeKey}>
        <CTabList variant="tabs">
          <CTab itemKey="experience" onClick={() => setActiveKey("experience")}>
            Experience
          </CTab>
          <CTab itemKey="education" onClick={() => setActiveKey("education")}>
            Education
          </CTab>
          <CTab itemKey="skills" onClick={() => setActiveKey("skills")}>
            Skills
          </CTab>
        </CTabList>
        <Suspense fallback={<div className="d-flex justify-content-center align-items-center"><CSpinner size="sm" /></div>}>
          <CTabContent>
            <CTabPanel className="p-3" itemKey="experience">
              {activeKey === "experience" && <EperienceCard />}
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="education">
              {activeKey === "education" && <EducationCard />}
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="skills">
              {activeKey === "skills" && <Skills />}
            </CTabPanel>
          </CTabContent>
        </Suspense>
      </CTabs>
    </>
  );
};

export default Experience;
