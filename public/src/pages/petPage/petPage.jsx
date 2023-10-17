import React, { useState } from 'react';
import Header from '../../components/Header/header';
import PageTabs from '../../components/PageTabs/PageTabs';
import styles from './petPage.module.css';
import PetCard from '../../components/PetCard/PetCard';
import PetLogform from '../../components/PetLogForm/PetLogform';
import Button from '../../components/Button/Button';
import MedicationForm from '../../components/MedicationForm/MedicationForm';
import VaccinationForm from '../../components/VaccinationForm/VaccinationForm';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';


const PetPage = () => {
  const tabToButtonLabel = {
    petLog: 'PetLog',
    medication: 'Medication',
    appointment: 'Appointment',
    vaccination: 'Vaccination',
    // Add more tabs and labels as needed
  };
  const [activeLink, setActiveLink] = useState("petLog");
  const [buttonLabel, setButtonLabel] = useState(tabToButtonLabel[activeLink]);


  // Define the content for each tab, in this case, the content is a form component
  const tabContents = { 
    petLog:<PetLogform />,
     appointment: <AppointmentForm />,
     medication: <MedicationForm/>,
    vaccination: <VaccinationForm />,
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setButtonLabel(tabToButtonLabel[link]);

  };

  console.log("Active Tab:", activeLink);

  return (
    <div className={styles.petPage}>
      <Header> </Header>
      <div className={styles.petPageGrid}>
        <div className={styles.petPagePetCard}>
          <PetCard> </PetCard>
        </div>
        <div className={styles.petPageTab}>
        <Button variant="yellow" label={buttonLabel} size="dk-md-s"/> 
          <PageTabs tabs={Object.keys(tabContents)} activeTab={activeLink} onTabChange={handleLinkClick} />
          <div className={styles.tabContent} >
          {tabContents[activeLink]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
