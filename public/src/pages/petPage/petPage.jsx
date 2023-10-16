import React, { useState } from 'react';
import Header from '../../components/Header/header';
import PageTabs from '../../components/PageTabs/PageTabs';
import styles from './petPage.module.css';
import PetCard from '../../components/PetCard/PetCard';
import PetLogForm from '../../components/PetLogForm/PetLogform'; // Import your form components for each tab
import VaccinationForm from '../../components/VaccinationForm/VaccinationForm';
// import AppointmentForm from './AppointmentForm';


const PetPage = () => {
  const [activeLink, setActiveLink] = useState("petLog");

  // Define the content for each tab, in this case, the content is a form component
  const tabContents = {
    petLog: <PetLogForm />,
    // appointment: <AppointmentForm />,
    // medication: <MedicationForm />,
    // vaccination: <VaccinationForm />,
    vaccination: <VaccinationForm />
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
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
