import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import PageTabs from '../../components/PageTabs/PageTabs';
import styles from './petPage.module.css';
import PetCard from '../../components/PetCard/PetCard';
import PetLogform from '../../components/PetLogForm/PetLogform';
import Button from '../../components/Button/Button';
import MedicationForm from '../../components/MedicationForm/MedicationForm';
import VaccinationForm from '../../components/VaccinationForm/VaccinationForm';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import axios from 'axios';
import { searchPetsByUserIDRoute } from '../../utils/APIRoutes.js'
import VaccinationCard from '../../components/VaccinationCard/VaccinationCard';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import PetLogCard from '../../components/PetLogCard/PetLogCard';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import ImageDisplay from '../../components/ImageDisplay/ImageDisplay';

const PetPage = () => {

  const [pets,setPets] =useState([]);
  
  useEffect(async() => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
  const response = await axios.get(searchPetsByUserIDRoute,{params:{userID:data._id}})
  setPets(response.data);
  console.log(pets);
}
,[]);

  const tabToButtonLabel = {
    petLog: "PetLog",
    medication: "Medication",
    appointment: "Appointment",
    vaccination: "Vaccination",
    // Add more tabs and labels as needed
  };


  const [activeLink, setActiveLink] = useState("petLog");
  const [buttonLabel, setButtonLabel] = useState(tabToButtonLabel[activeLink]);

  // Define the content for each tab, in this case, the content is a form component
  const tabContents = {
    petLog: (
      <div>
        <div className={styles.getPetPage}>
          <PetLogCard />
        </div>
        <div className={styles.postPetPage}>
          <PetLogform />
        </div>
      </div>
    ),
    appointment: (
      <div>
        <div className={styles.getPetPage}>
          <AppointmentCard />
        </div>
        <div className={styles.postPetPage}>
          <AppointmentForm />
        </div>
      </div>
    ),

    medication: (
      <div>
        <div className={styles.getPetPage}>
          <MedicineCard />
        </div>
        <div className={styles.postPetPage}>
          <MedicationForm />
        </div>
      </div>
    ),

    vaccination: (
      <div>
        <div className={styles.getPetPage}>
          <VaccinationCard />
        </div>
        <div className={styles.postPetPage}>
          <VaccinationForm />
        </div>
      </div>
    ),
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
          <Button variant="yellow" label={buttonLabel} size="dk-md-s" />
          <PageTabs
            tabs={Object.keys(tabContents)}
            activeTab={activeLink}
            onTabChange={handleLinkClick}
          />
          <div className={styles.tabContent}>{tabContents[activeLink]}</div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
