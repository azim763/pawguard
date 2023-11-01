import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  searchPetLogsByPetIDRoute,
} from "../../utils/APIRoutes.js";
import VaccinationCard from "../../components/VaccinationCard/VaccinationCard";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import PetLogCard from "../../components/PetLogCard/PetLogCard";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import TotalPets from "../../components/TotalPets/TotalPets";
// import ImageDisplay from '../../components/ImageDisplay/ImageDisplay';
import Map from "../../components/Map/Map";
import Typography from "../../components/Typography/Typography";

const PetPage = () => {
  const location = useLocation();
  const { selectedPetID } = location.state || {};
  const [pets, setPets] = useState([]);

  const [petLog, setPetLog] = useState([]);
  const [petAppointments, setPetAppointments] = useState([]);
  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");

  console.log(pets);

  const isValidCoordinate = (coord) => {
    return (
      typeof coord === "object" &&
      !isNaN(coord.Latitude) &&
      !isNaN(coord.Longitude)
    );
  };
  const validPetAppointments = petAppointments.filter(isValidCoordinate);

  const handleMedicationSubmit = (newMedicationData) => {
    setPetMedications((prevMedications) => [
      ...prevMedications,
      newMedicationData,
    ]);
  };
  const handleAppointmentSubmit = (newAppointmentData) => {
    setPetAppointments((prevAppointment) => [
      ...prevAppointment,
      newAppointmentData,
    ]);
  };
  const handleVaccinationSubmit = (newVaccinationData) => {
    setPetVaccines((prevVaccination) => [
      ...prevVaccination,
      newVaccinationData,
    ]);
  };
  const handlePetLogSubmit = (newPetLogData) => {
    setPetLog((prevPetLog) => [...prevPetLog, newPetLogData]);
  };
  const handlePetLogDelete = (deletedLogId) => {
    setPetLog((prevPetLog) => prevPetLog.filter((log) => log._id !== deletedLogId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const petData = localStorage.getItem("petsData");
          if (petData) {
            const petArray = JSON.parse(petData);
            setPets(petArray);

            if (!selectedPet && petArray.length > 0) {
              setSelectedPet(petArray[0]); // Set the first pet by default
            }

            if (selectedPetID) {
              // Find the pet with the matching ID and set it as the selectedPet
              const matchingPet = petArray.find(
                (pet) => pet._id === selectedPetID
              );
              if (matchingPet) {
                setSelectedPet(matchingPet);
              }
            }
          } else {
            const data = JSON.parse(storedData);
            const response = await axios.get(searchPetsByUserIDRoute, {
              params: { userID: data._id },
            });
            setPets(response.data);
            if (!selectedPet && response.data.length > 0) {
              setSelectedPet(response.data[0]);
            }
          }
        }
      } catch (error) {
        // Handle any errors here
      }
    };

    // Fetch data when the component mounts or when selectedPetID changes
    fetchData();
  }, [selectedPetID]);

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
        console.log(response.data);
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

  const tabToButtonLabel = {
    PetLog: "Pet Log",
    Medication: "Medication",
    Appointment: "Appointment",
    Vaccination: "Vaccination",
  };

  const [activeLink, setActiveLink] = useState("petLog");
  const [buttonLabel, setButtonLabel] = useState(tabToButtonLabel[activeLink]);

  function calculateAge(birthDate) {
    if (!birthDate) {
      return "-";
    }

    const currentDate = new Date();
    const dateOfBirth = new Date(birthDate);

    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();

    if (
      currentDate.getMonth() < dateOfBirth.getMonth() ||
      (currentDate.getMonth() === dateOfBirth.getMonth() &&
        currentDate.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    return age;
  }

  const petAge = calculateAge(selectedPet.Birthday);

  const tabContents = {
    PetLog: (
      <div>
        <div className={styles.getPetPage}>
          {petLog.length > 0 && (
            <div>
              {petLog.map((log) => (
                
                <PetLogCard
                  PetLogDate={log.LogDate}
                  PetLogTime={log.timestamp}
                  logId={log._id}
                  onDelete={() => handlePetLogDelete(log._id)}


                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.postPetPage}>
          {selectedPet && selectedPet._id && (
            <PetLogform
              selectedPet={selectedPet}
              onPetLogSubmit={handlePetLogSubmit}
            />
          )}
        </div>
      </div>
    ),
    Appointment: (
      <div>
        <div className={styles.getPetPage}>
          {petAppointments.length > 0 && (
            <div>
              <Map coordinates={validPetAppointments} />
              {petAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  ClinicName={appointment.ClinicName}
                  AppointmentTime={appointment.AppointmentTime}
                  AppointmentReason={appointment.AppointmentReason}
                  AppointmentDateTime={appointment.AppointmentDate}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.postPetPage}>
          {selectedPet && (
            <AppointmentForm
              selectedPet={selectedPet}
              onAppointmentSubmit={handleAppointmentSubmit}
            />
          )}
        </div>
      </div>
    ),

    Medication: (
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
          {selectedPet && (
            <MedicationForm
              selectedPet={selectedPet}
              onMedicationSubmit={handleMedicationSubmit}
            />
          )}
        </div>
      </div>
    ),

    Vaccination: (
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
          {selectedPet && (
            <VaccinationForm
              selectedPet={selectedPet}
              onVaccinationSubmit={handleVaccinationSubmit}
            />
          )}
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
    <div>
      <Header> </Header>
      <div className={styles.petPageGrid}>
        {selectedPet && (
          <PetCard
            src={selectedPet.PetImageName}
            petBreed={selectedPet.Breed}
            petAge={petAge !== "-" ? `${petAge} years` : "-"}
            petHeight={selectedPet.Height}
            petWeight={selectedPet.Weight}
          />
        )}

        <div className={styles.allTabs}>
          <div className={styles.tabTitle}>
            <Typography variant="large-h1-poppins-bold">
              {selectedPet.PetName}
            </Typography>
            {pets && <TotalPets pets={pets} onPetSelect={handlePetSelection} />}
            <Button variant="yellow" label={buttonLabel} size="dk-md-s" />
          </div>

          <div className={styles.petPageTab}>
            <PageTabs
              tabs={Object.keys(tabContents)}
              activeTab={activeLink}
              onTabChange={handleLinkClick}
            />
            <div className={styles.tabContent}>{tabContents[activeLink]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
