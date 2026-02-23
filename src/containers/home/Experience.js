import React, { useState } from "react";
import EperienceCard from "../../components/Experience/EperienceCard";
import { CTab, CTabContent, CTabList, CTabs, CTabPanel } from "@coreui/react";
import EducationCard from "../../components/Experience/EducationCard";
import Skills from "../../components/Experience/Skills";
const Experience = () => {
  const [activeKey, setActiveKey] = useState('experience');
  return (
    <>
      <CTabs activeItemKey={activeKey}>
        <CTabList variant="tabs">
          <CTab itemKey="experience" onClick={() => setActiveKey('experience')}>Experience</CTab>
          <CTab itemKey="education" onClick={() => setActiveKey('education')}>Education</CTab>
          <CTab itemKey="skills" onClick={() => setActiveKey('skills')}>Skills</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="experience">
            <EperienceCard />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="education">
              <EducationCard />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="skills">
            <Skills />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </>
  );
};

export default Experience;
