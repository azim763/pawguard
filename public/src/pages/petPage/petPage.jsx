import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useCollapse } from "react-collapsed";

const PetPage = () => {
  const location = useLocation();
  const { selectedPetID } = location.state || {};
  const [pets, setPets] = useState([]);

  const [petLog, setPetLog] = useState([]);
  const [petAppointments, setPetAppointments] = useState([]);
  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [validPetAppointments, setValidPetAppointments] = useState([]);
  const [isVaccinationFormExpanded, setVaccinationFormExpanded] =
    useState(false);

  const [isMedicationFormExpanded, setMedicationFormExpanded] = useState(false);

  const [isPetLogFormExpanded, setPetLogFormExpanded] = useState(false);

  const [isAptFormExpanded, setAptFormExpanded] = useState(false);
  const [selectedPetLog, setSelectedPetLog] = useState(null);
  const [formMode, setFormMode] = useState("create");


  const petLogFormRef = useRef(null);

  const handlePetLogClick = (log) => {
    setSelectedPetLog(log);
    setFormMode("view");
    setPetLogFormExpanded(true);
    petLogFormRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(log);
  };
  const handlePetLogButtonClick = () => {
    petLogFormRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const appointmentFormRef = useRef(null);
  const handleAppointmentButtonClick = () => {
    appointmentFormRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const medicationFormRef = useRef(null);
  const handleMedicationButtonClick = () => {
    medicationFormRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const vaccincationFormRef = useRef(null);
  const handleVaccincationButtonClick = () => {
    vaccincationFormRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const {
    getCollapseProps: getPetLogCollapseProps,
    getToggleProps: getPetLogToggleProps,
    isExpanded: isPetLogExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getAppointmentCollapseProps,
    getToggleProps: getAppointmentToggleProps,
    isExpanded: isAppointmentExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getMedicationCollapseProps,
    getToggleProps: getMedicationToggleProps,
    isExpanded: isMedicationExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getVaccinationCollapseProps,
    getToggleProps: getVaccinationToggleProps,
    isExpanded: isVaccinationExpanded,
  } = useCollapse();

 

  const formatDate = (date) => {
    console.log("formatDate");
    console.log(date);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  };
  const handleAppointmentDelete = (deletedAppointmentId) => {
    // Remove the appointment with the deleted ID from petAppointments
    setPetAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment._id !== deletedAppointmentId
      )
    );

    // Update validPetAppointments to exclude the deleted appointment
    setValidPetAppointments(
      validPetAppointments.filter(
        (appointment) => appointment._id !== deletedAppointmentId
      )
    );
  };

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

    setValidPetAppointments((validPetAppointments) => [
      ...validPetAppointments,
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
    console.log("newPetLogData");
    console.log(newPetLogData);
    setPetLog((prevPetLog) => [...prevPetLog, newPetLogData]);
  };

  const handlePetLogDelete = (deletedLogId) => {
    setPetLog((prevPetLog) =>
      prevPetLog.filter((log) => log._id !== deletedLogId)
    );
  };

  const handleVaccinationDelete = (deleteVaccinationId) => {
    setPetVaccines((prevVaccination) =>
      prevVaccination.filter((vaccine) => vaccine._id !== deleteVaccinationId)
    );
  };

  const handleMedicationDelete = (deleteMedicationId) => {
    setPetMedications((prevMedications) =>
      prevMedications.filter(
        (medication) => medication._id !== deleteMedicationId
      )
    );
  };

  const closeAptForm = () => {
    setAptFormExpanded(false);
  };

  const closePetLogForm = () => {
    setPetLogFormExpanded(false);
  };

  const closeMedForm = () => {
    setMedicationFormExpanded(false);
  };

  const closeVacForm = ()=>{
    setVaccinationFormExpanded(false);
  }

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
            console.log(data);
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
        setValidPetAppointments(response.data);
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
    PetLog: "PetLog",
    Medication: "Medication",
    Appointment: "Appointment",
    Vaccination: "Vaccination",
  };

  const [activeLink, setActiveLink] = useState("PetLog");
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
          {petLog.length > 0 ? (
            <div className={styles.cardStyle}>
              {petLog.map((log) => (
                <div key={log._id} onClick={() => handlePetLogClick(log)}>
                  <PetLogCard 
                    PetLogDate={log.LogDate}
                    PetLogTime={log.timestamp}
                    logId={log._id}
                    onDelete={() => handlePetLogDelete(log._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            !isPetLogFormExpanded && (
              <div className={styles.noLogImage}>
                <div className={styles.noLogText}>
                  <Typography variant="sub-poppins-medium" color="white">
                    Add New Pet Log
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>
        <div className={styles.postPetPage}>
          {selectedPet && selectedPet._id && (
            <div className="collapsible" ref={petLogFormRef}>
              <div {...getPetLogCollapseProps()}>
                <PetLogform
                  selectedPet={selectedPet}
                  onPetLogSubmit={handlePetLogSubmit}
                  SelectedPetID={selectedPet._id}
                  getToggleProps={getPetLogToggleProps}
                  closePetLogForm={closePetLogForm}
                  selectedLog={selectedPetLog}
                  formMode={formMode}
                  />
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    Appointment: (
      <div>
        <div className={styles.getPetPage}>
          {validPetAppointments.length > 0 ? (
            <div>
              <div style={{ marginBottom: "27px", marginTop: "10px" }}>
                <Map coordinates={validPetAppointments} />
              </div>
              <div className={styles.aptStyle}>
                {petAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={index}
                    ClinicName={appointment.ClinicName}
                    AppointmentTime={appointment.AppointmentTime}
                    AppointmentReason={appointment.AppointmentReason}
                    AppointmentDateTime={appointment.AppointmentDate}
                    AppointmentId={appointment._id}
                    onDelete={() => handleAppointmentDelete(appointment._id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            !isAptFormExpanded && (
              <div className={`${styles.noLogImage} ${styles.noAptImage} `}>
                <div className={styles.noLogText}>
                  <Typography variant="sub-poppins-medium" color="white">
                    Add Your Pet’s Vet Appointments
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.postPetPage}>
          {selectedPet && (
            <div className="collapsible" ref={appointmentFormRef}>
              <div {...getAppointmentCollapseProps()}>
                <AppointmentForm
                  selectedPet={selectedPet}
                  onAppointmentSubmit={handleAppointmentSubmit}
                  getToggleProps={getAppointmentToggleProps}
                  closeAptForm={closeAptForm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    Medication: (
      <div>
        <div className={styles.getPetPage}>
          {petMedications.length > 0 ? (
            <div className={styles.cardStyle}>
              {petMedications.map((medication) => (
                <MedicineCard
                  key={medication._id}
                  medicineName={medication.MedicineName}
                  dosage={medication.DosageAmount}
                  startDate={formatDate(new Date(medication.MedicationDate))}
                  Period={medication.MedicationPeriod}
                  MedicineTime={medication.MedicineTime}
                  onDelete={() => handleMedicationDelete(medication._id)}
                  MedicationId={medication._id}
                />
              ))}
            </div>
          ) : (
            !isMedicationFormExpanded && (
              <div className={`${styles.noLogImage} ${styles.noMedImage} `}>
                <div className={styles.noLogText}>
                  <Typography variant="sub-poppins-medium" color="white">
                    Add Your Pet’s Medicine Details
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.postPetPage}>
          {selectedPet && (
            <div className="collapsible" ref={medicationFormRef}>
              <div {...getMedicationCollapseProps()}>
                <MedicationForm
                  selectedPet={selectedPet}
                  onMedicationSubmit={handleMedicationSubmit}
                  getToggleProps={getMedicationToggleProps}
                  closeMedForm={closeMedForm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    Vaccination: (
      <div>
        <div className={styles.getPetPage}>
          {petVaccines.length > 0 ? (
            <div className={styles.cardStyle}>
              {petVaccines.map((vaccine) => (
                <VaccinationCard
                  key={vaccine._id}
                  VaccineName={vaccine.NameOfVaccination}
                  VaccineDate={new Date(vaccine.VaccinationDate)}
                  onDelete={() => handleVaccinationDelete(vaccine._id)}
                  VaccineId={vaccine._id}
                />
              ))}
            </div>
          ) : (
            !isVaccinationFormExpanded && (
              <div className={`${styles.noLogImage} ${styles.noVacImage} `}>
                <div className={styles.noLogText}>
                  <Typography variant="sub-poppins-medium" color="white">
                    Record Your Pet’s Vaccinations
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.postPetPage}>
          {selectedPet && (
            <div className="collapsible" ref={vaccincationFormRef}>
              <div {...getVaccinationCollapseProps()}>
                <VaccinationForm
                  selectedPet={selectedPet}
                  onVaccinationSubmit={handleVaccinationSubmit}
                  getToggleProps={getVaccinationToggleProps}
                  closeVacForm={closeVacForm}
                />
              </div>
            </div>
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
    <div className={styles.petPageMain}>
      <Header> </Header>
      <div className={styles.petPageGrid}>
        <div className={styles.tabTitle}>
          <Typography variant="large-h1-poppins-bold">
            {selectedPet.PetName}
          </Typography>
          {pets && <TotalPets pets={pets} onPetSelect={handlePetSelection} />}

          {buttonLabel === "PetLog" && (
            <Button
              variant="yellow"
              label={buttonLabel}
              size="dk-md-s"
              {...getPetLogToggleProps()}
              onClick={(event) => {
                setFormMode("create")
                getPetLogToggleProps().onClick(event);
                if (!isPetLogFormExpanded) {
                  setTimeout(() => {
                    handlePetLogButtonClick();
                  }, 300);
                }

                setPetLogFormExpanded(!isPetLogFormExpanded);

                // if (isPetLogFormExpanded) {
                //   setPetLogFormExpanded(true);
                // } else {
                //   setPetLogFormExpanded(false);
                // }

                console.log(isPetLogFormExpanded);
              }}
            />
          )}

          {buttonLabel === "Appointment" && (
            <Button
              variant="yellow"
              label={buttonLabel}
              size="dk-md-s"
              {...getAppointmentToggleProps()}
              onClick={(event) => {
                getAppointmentToggleProps().onClick(event);
                if (!isAppointmentExpanded) {
                  setTimeout(() => {
                    handleAppointmentButtonClick();
                  }, 300);
                }
                setAptFormExpanded(!isAptFormExpanded);
                console.log(isAptFormExpanded);
              }}
            />
          )}

          {buttonLabel === "Medication" && (
            <Button
              variant="yellow"
              label={buttonLabel}
              size="dk-md-s"
              {...getMedicationToggleProps()}
              onClick={(event) => {
                getMedicationToggleProps().onClick(event);
                if (!isMedicationExpanded) {
                  setTimeout(() => {
                    handleMedicationButtonClick();
                  }, 300);
                }
                setMedicationFormExpanded(!isMedicationFormExpanded);
              }}
            />
          )}

          {buttonLabel === "Vaccination" && (
            <Button
              variant="yellow"
              label={buttonLabel}
              size="dk-md-s"
              {...getVaccinationToggleProps()}
              onClick={(event) => {
                getVaccinationToggleProps().onClick(event);
                if (!isVaccinationExpanded) {
                  setTimeout(() => {
                    handleVaccincationButtonClick();
                  }, 300);
                }
                setVaccinationFormExpanded(!isVaccinationFormExpanded);
              }}
            />
          )}
        </div>
        <div className={styles.petCard}>
          {selectedPet && (
            <PetCard
              src={selectedPet.PetImageName}
              petBreed={selectedPet.Breed}
              petAge={petAge !== "-" ? `${petAge} years` : "-"}
              petHeight={selectedPet.Height}
              petWeight={selectedPet.Weight}
              id={selectedPet._id}
            />
          )}
        </div>

        <div className={styles.allTabs}>
          {/* <div className={styles.tabTitle}>
            <Typography variant="large-h1-poppins-bold">
              {selectedPet.PetName}
            </Typography>
            {pets && <TotalPets pets={pets} onPetSelect={handlePetSelection} />}
            <Button variant="yellow" label={buttonLabel} size="dk-md-s" />
          </div> */}

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
