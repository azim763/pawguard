import React ,{useState, useEffect}from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import PetSelectionPage from "../../components/PetSelection/PetSelection";
import styles from "./insuranceSearch.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import axios from "axios";
import {searchPetsByUserIDRoute} from "../../utils/APIRoutes";
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";

const InsuranceSearch = () => {
  const [pets,setPets] =useState([]);
  
  useEffect(async() => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
  const response = await axios.get(searchPetsByUserIDRoute,{
    params:{userID:data._id}
  })
  setPets(response.data);
}
,[]);

  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <Typography variant="h1-poppins-semibold" color="almost-black">
        <div
          style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}
        >
          Select the pet you would like to get quotes
        </div>
      </Typography>
      <Typography variant="sub-h2-poppins-medium" color="almost-black">
        <div
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "2%",
          }}
        >
          <a href = "" style = {{color: "var(--almost-black)"}}>Enter new pet's information</a>
        </div>
      </Typography>

      <div className={styles.petSelectionContainer}>
        <PetSelectionPage
          imgUrl="https://picsum.photos/200"
          petName="Orea"
        ></PetSelectionPage>

        <PetSelectionPage
          imgUrl="https://picsum.photos/200"
          petName="Milo"
        ></PetSelectionPage>

        <PetSelectionPage
          imgUrl="https://picsum.photos/200"
          petName="Lina"
        ></PetSelectionPage>
      </div>

      <div className={styles.formContainer}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            About Pet Milo
          </div>
        </Typography>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Type of Pet
          </Typography>

          <ButtonGroup groupId="group1" buttons={["Cat", "Dog"]} />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Pet's gender
          </Typography>

          <ButtonGroup groupId="group2" buttons={["Male", "Female"]} />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Pet's age
          </Typography>
          <Dropdown
            key="exampleDropdown"
            defaultValue="Select age"
            // onChange={handleDropdownChange}
            options={[
              { value: "under1Year", label: "under 1 years old" },
              { value: "1-3yearsOld", label: "1 - 3 years old" },
              { value: "4-6yearsOld", label: "4 - 6 years old" },
              { value: "7above", label: "+ 7 years old" },
            ]}
            size="large"
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Pet's breed
          </Typography>
          {/* <Dropdown
            key="exampleDropdown"
            // onChange={handleDropdownChange}
            defaultValue="Select a breed"
            options={[
              { value: "1", label: "1" },
              { value: "1-3yearsOld", label: "1 - 3 years old" },
              { value: "4-6yearsOld", label: "4 - 6 years old" },
              { value: "7above", label: "+ 7 years old" },
            ]}
            size="large"
          /> */}
          <MultipleDropDown options={["1", "1-3 years old", "4-6 years old", "+ 7 years old"]} />

        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            What is your ZIP code
          </Typography>
          <TextInput />
        </div>
        <div style={{ width: "300px" }}>
          <Button variant="yellow" size="dk-md" label="Get Quotes" />
        </div>
      </div>
    </div>
  );
};

export default InsuranceSearch;
