import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
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
  host,
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
import LoadPage from "../loadPage";
import LoadingOverlay from "react-loading-overlay-ts";

const PetPage = () => {
  const location = useLocation();
  const { selectedPetID } = location.state || {};
  const [pets, setPets] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [petLog, setPetLog] = useState([]);
  const [petAppointments, setPetAppointments] = useState([]);
  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [validPetAppointments, setValidPetAppointments] = useState([]);

  const [selectedPetLog, setSelectedPetLog] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [isLoadingData, setLoadingData] = useState(false);

  const petLogFormRef = useRef(null);
  const navigate = useNavigate();
  // const socket = useRef();

  const {
    getCollapseProps: getPetLogCollapseProps,
    getToggleProps: getPetLogToggleProps,
    isExpanded: isPetLogFormExpanded,
    setExpanded: setPetLogFormExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getAppointmentCollapseProps,
    getToggleProps: getAppointmentToggleProps,
    isExpanded: isAppointmentFormExpanded,
    setExpanded: setAppointmentFormExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getMedicationCollapseProps,
    getToggleProps: getMedicationToggleProps,
    isExpanded: isMedicationFormExpanded,
    setExpanded: setMedicationFormExpanded,
  } = useCollapse();

  const {
    getCollapseProps: getVaccinationCollapseProps,
    getToggleProps: getVaccinationToggleProps,
    isExpanded: isVaccinationFormExpanded,
    setExpanded: setVaccinationFormExpanded,
  } = useCollapse();

  const handlePetLogClick = (log) => {
    setFormMode("view");
    setSelectedPetLog(log);
    setPetLogFormExpanded(true);
    if (!isPetLogFormExpanded) {
      setTimeout(() => {
        handlePetLogButtonClick();
      }, 300);
    }
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

  const formatDate = (date) => {
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
    setMedicationFormExpanded(false);
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
    setAppointmentFormExpanded(false);
  };
  const handleVaccinationSubmit = (newVaccinationData) => {
    setPetVaccines((prevVaccination) => [
      ...prevVaccination,
      newVaccinationData,
    ]);
    setVaccinationFormExpanded(false);
  };
  const handlePetLogSubmit = (newPetLogData) => {
    setPetLog((prevPetLog) => [...prevPetLog, newPetLogData]);
    setPetLogFormExpanded(false);
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
    setAppointmentFormExpanded(false);
  };

  const closePetLogForm = () => {
    setPetLogFormExpanded(false);
  };

  const closeMedForm = () => {
    setMedicationFormExpanded(false);
  };

  const closeVacForm = () => {
    setVaccinationFormExpanded(false);
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
              setSelectedPet(petArray[0]);
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
    if (selectedPet != pet) {
      setPetLogFormExpanded(false);
      setAppointmentFormExpanded(false);
      setMedicationFormExpanded(false);
      setVaccinationFormExpanded(false);
      setSelectedPet(pet);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

        const petId = selectedPet._id;
        const response = await axios.get(searchPetLogsByPetIDRoute, {
          params: { PetID: petId },
        });

        setPetLog(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoadingData(false);
        document.body.style.overflow = "unset";
        document.body.style.height = "auto";
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
    PetLog: "Add PetLog",
    Medication: "Add Medication",
    Appointment: "Add Appointment",
    Vaccination: "Add Vaccination",
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
                <div key={log._id} onClick={(e) => handlePetLogClick(log)}>
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
                  getToggleProps={() =>
                    getPetLogToggleProps({
                      onClick: () =>
                        setPetLogFormExpanded((prevExpanded) => !prevExpanded),
                    })
                  }
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
            !isAppointmentFormExpanded && (
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
                  getToggleProps={() =>
                    getAppointmentToggleProps({
                      onClick: () =>
                        setAppointmentFormExpanded(
                          (prevExpanded) => !prevExpanded
                        ),
                    })
                  }
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

  const handlePetArchive = (petId) => {
    const petDataString = localStorage.getItem("petsData");

    if (petDataString) {
      try {
        // Parse the petData into an array
        const petData = JSON.parse(petDataString);

        // Filter out the pet with the specified ID
        const updatedPetData = petData.filter((pet) => pet._id !== petId);

        // Convert the updated petData back to a string
        const updatedPetDataString = JSON.stringify(updatedPetData);

        // Update localStorage with the modified data
        localStorage.setItem("petsData", updatedPetDataString);
      } catch (error) {
        console.error("Error parsing or updating petsData:", error);
      }
    }
    // Find the index of the pet to be archived
    const indexToRemove = pets.findIndex((pet) => pet._id === petId);

    // Filter out the pet with the specified ID
    const updatedPets = pets.filter((pet) => pet._id !== petId);

    // Set the updated pets array
    setPets(updatedPets);

    // Determine the index of the next pet to select
    const nextPetIndex =
      indexToRemove < updatedPets.length ? indexToRemove : indexToRemove - 1;

    // Set the selected pet to the next pet in the array
    setSelectedPet(updatedPets[nextPetIndex]);
  };

  return (
    <LoadingOverlay
      active={isLoadingData}
      spinner={<LoadPage />}
      fadeSpeed={300}
      styles={{
        overlay: (base) => ({
          ...base,
          height: "100vh",
          overflow: "hidden",
        }),
      }}
    >
      <div className={styles.petPageMain}>
        <Header> </Header>
        <div className={styles.petPageGrid}>
          <div className={styles.tabTitle}>
            <Typography variant="large-h1-poppins-bold">
              {selectedPet.PetName}
            </Typography>
            {pets && (
              <TotalPets
                pets={pets}
                selectedPet={selectedPet}
                onPetSelect={handlePetSelection}
              />
            )}

            {buttonLabel === "Add PetLog" && (
              <Button
                variant="yellow"
                label={buttonLabel}
                size="dk-md-s"
                {...getPetLogToggleProps({
                  onClick: () =>
                    setPetLogFormExpanded((prevExpanded) => !prevExpanded),
                })}
                onClick={(event) => {
                  setFormMode("create");
                  setPetLogFormExpanded(!isPetLogFormExpanded);
                  if (!isPetLogFormExpanded) {
                    setTimeout(() => {
                      handlePetLogButtonClick();
                    }, 300);
                  }
                }}
              />
            )}

            {buttonLabel === "Add Appointment" && (
              <Button
                variant="yellow"
                label={buttonLabel}
                size="dk-md-s"
                {...getAppointmentToggleProps({
                  onClick: () =>
                    setAppointmentFormExpanded((prevExpanded) => !prevExpanded),
                })}
                onClick={(event) => {
                  setAppointmentFormExpanded(!isAppointmentFormExpanded);
                  if (!isAppointmentFormExpanded) {
                    setTimeout(() => {
                      handleAppointmentButtonClick();
                    }, 300);
                  }
                }}
              />
            )}

            {buttonLabel === "Add Medication" && (
              <Button
                variant="yellow"
                label={buttonLabel}
                size="dk-md-s"
                {...getMedicationToggleProps({
                  onClick: () =>
                    setMedicationFormExpanded((prevExpanded) => !prevExpanded),
                })}
                onClick={(event) => {
                  setMedicationFormExpanded(!isMedicationFormExpanded);
                  if (!isMedicationFormExpanded) {
                    setTimeout(() => {
                      handleMedicationButtonClick();
                    }, 300);
                  }
                }}
              />
            )}

            {buttonLabel === "Add Vaccination" && (
              <Button
                variant="yellow"
                label={buttonLabel}
                size="dk-md-s"
                {...getVaccinationToggleProps({
                  onClick: () =>
                    setVaccinationFormExpanded((prevExpanded) => !prevExpanded),
                })}
                onClick={(event) => {
                  setVaccinationFormExpanded(!isVaccinationFormExpanded);
                  if (!isVaccinationFormExpanded) {
                    setTimeout(() => {
                      handleVaccincationButtonClick();
                    }, 300);
                  }
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
                onArchive={() => handlePetArchive(selectedPet._id)}
              />
            )}
          </div>

          <div className={styles.allTabs}>
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
    </LoadingOverlay>
  );
};

export default PetPage;
