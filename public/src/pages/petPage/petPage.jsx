import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import PageTabs from "../../components/PageTabs/PageTabs";
import styles from "./petPage.module.css";
import PetCard from "../../components/PetCard/PetCard";
import PetLogform from "../../components/PetLogForm/PetLogform";
import Button from "../../components/Button/Button";
import MedicationForm from "../../components/MedicationForm/MedicationForm";
import VaccinationForm from "../../components/VaccinationForm/VaccinationForm";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import axios from "axios";
import {
  searchPetsByUserIDRoute,
  searchPetVaccinationsByPetIDRoute,
  searchPetMedicationsByPetIDRoute,
  searchPetAppointmentsByPetIDRoute,
  searchPetLogsByPetIDRoute
} from "../../utils/APIRoutes.js";
import VaccinationCard from "../../components/VaccinationCard/VaccinationCard";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import PetLogCard from "../../components/PetLogCard/PetLogCard";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import TotalPets from "../../components/TotalPets/TotalPets";
// import ImageDisplay from '../../components/ImageDisplay/ImageDisplay';
import Map from "../../components/Map/Map";

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [petLog, setPetLog] = useState([]);
  const [petAppointments, setPetAppointments] = useState([]);
  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchPetLogsByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });
        setPetLog(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [selectedPet._id]);
  

  useEffect(() => {
    axios
      .get(searchPetAppointmentsByPetIDRoute, {
        params: { PetID: selectedPet._id },
      })
      .then((response) => {
        setPetAppointments(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [selectedPet._id]);

  useEffect(() => {
    axios
      .get(searchPetMedicationsByPetIDRoute, {
        params: { PetID: selectedPet._id },
      })
      .then((response) => {
        setPetMedications(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [selectedPet._id]);

  useEffect(() => {
    axios
      .get(searchPetVaccinationsByPetIDRoute, {
        params: { PetID: selectedPet._id },
      })
      .then((response) => {
        setPetVaccines(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [selectedPet._id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const data = JSON.parse(storedData);
          const response = await axios.get(searchPetsByUserIDRoute, {
            params: { userID: data._id },
          });
          await setPets(response.data);
          // Set the initially selected pet to be the first pet if not already selected
          if (!selectedPet && response.data.length > 0) {
            setSelectedPet(response.data[0]);
          }
        }
      } catch (error) {
        // Handle any errors here
      }
    };
  
    fetchData();
  }, [selectedPet]);
  

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
          {petLog.length > 0 && (
            <div>
              {petLog.map((log) => (
                <PetLogCard
                  PetLogDate={log.LogDate}
                  PetLogTime={log.timestamp}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.postPetPage}>
         {selectedPet && selectedPet._id && <PetLogform selectedPet={selectedPet} />}

        </div>
      </div>
    ),
    appointment: (
      <div>
        <div className={styles.getPetPage}>
          {petAppointments.length > 0 && (
            <div>
              <Map
                latitude={49.246292}
                longitude={-123.116226}
                markerlong={-123.116226}
                markerlat={49.246292}
              />
              <div>
                {petAppointments.map((appointment) => (
                  <AppointmentCard
                    ClinicName={appointment.ClinicName}
                    AppointmentTime={appointment.AppointmentTime}
                    AppointmentReason={appointment.AppointmentReason}
                    AppointmentDateTime={appointment.AppointmentDate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.postPetPage}>
        {selectedPet && <AppointmentForm selectedPet={selectedPet} />}
        </div>
      </div>
    ),

    medication: (
      <div>
        <div className={styles.getPetPage}>
          {petMedications.length > 0 && (
            <div>
              {petMedications.map((medication) => (
                <MedicineCard
                  medicineName={medication.MedicineName}
                  dosage={medication.DosageAmount}
                  startDate={medication.MedicationDate}
                  Period={medication.MedicationPeriod}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.postPetPage}>
        {selectedPet && <MedicationForm selectedPet={selectedPet}/>}
        </div>
      </div>
    ),

    vaccination: (
      <div>
        <div className={styles.getPetPage}>
          {petVaccines.length > 0 && (
            <div>
              {petVaccines.map((vaccine) => (
                <VaccinationCard
                  VaccineName={vaccine.NameOfVaccination}
                  VaccineDate={vaccine.VaccinationDate}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.postPetPage}>
        {selectedPet && <VaccinationForm selectedPet={selectedPet} />}
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
      {pets && (
        <TotalPets pets={pets} onPetSelect={handlePetSelection} />
      )}      <div className={styles.petPageGrid}>
        <div className={styles.petPagePetCard}>
        {selectedPet && <PetCard src={selectedPet.PetImageName}> </PetCard>}
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
