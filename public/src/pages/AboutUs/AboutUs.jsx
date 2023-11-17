import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/header";
import styles from "../AboutUs/AboutUs.module.css";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import AboutUsFeature from "../../components/AboutUsFeature/AboutUsFeature";
import AboutUsProfile from "../../components/AboutUsProfile/AboutUsProfile";
import AbtUs1SVG from "../../components/SVG/AbtUs1SVG";
import AbtUs2SVG from "../../components/SVG/AbtUs2SVG";
import AbtUs3SVG from "../../components/SVG/AbtUs3SVG";
import image from "./../../assets/image-03.webp";
import image1 from "./../../assets/image-764.webp"

const AboutUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.AboutUspage}>
      <Header />
      <div className={styles.abtUsBody}>
        <div className={styles.abtUs1}>
          <div className={styles.abtUs1Description}>
            <Typography variant="large-h1-poppins-bold" color="almost-black">
              Safeguarding Pets, Simplifying Care
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              Elevate your pet's care journey with PetGuard and effortlessly
              manage their well-being, from food and medicine tracking to
              finding vet clinics nearby
            </Typography>
            <Button
              onClick={handleLoginClick}
              variant="blue-yellow"
              label="Get Started"
              size="dk-md"
            />
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
        </div>
        <div className={styles.abtUs2}>
          <div style = {{ maxWidth: '1440px', margin: 'auto'}}>
            <Typography variant="h2-poppins-semibold" color="almost-black">
              <div className={styles.title1}>Explore Our System</div>
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              Discover the future of pet care with PetGuard, where a suite of
              intuitive features simplifies every aspect of your pet's health and
              happiness
            </Typography>
            <div className={styles.abtUs2Images}>
              <div>
                <AbtUs2SVG/>
                <AboutUsFeature
                  title="Pet Health Tracking"
                  description="Track and record your pet’s health, medications and appointments"
                ></AboutUsFeature>
              </div>
              <div>
                <AbtUs3SVG />
                <AboutUsFeature
                  title="Find Specialised Vet Clinics"
                  description="Find clinics that offer specialized care for your pet’s needs"
                ></AboutUsFeature>
              </div>
              <div>
                <AbtUs1SVG />
                <AboutUsFeature
                  title="Insurance Recommendations"
                  description="View and compare the best pet insurance recommendations"
                ></AboutUsFeature>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.abtUs3}>
          <div style = {{ maxWidth: '1440px', margin: 'auto'}}>
            <Typography variant="h2-poppins-semibold" color="almost-black">
              <div className={styles.title1}>Our Team</div>
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              The PetGuard project's success is attributed to our dedicated team
              of UX/UI designers and developers. Our designers created an
              intuitive, visually appealing user experience, while our developers
              brought these designs to life, ensuring a seamless and reliable
              platform. This collaborative effort has simplified pet care and made
              it more accessible to pet owners
            </Typography>
            <div className={styles.abtUs3Images}>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="Sanika Coutinho"
                title="Sanika Coutinho"
                description="Designer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="Cassie Hsieh"
                title="Cassie Hsieh"
                description="Designer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Gillian Kwok"
                description="PM / Designer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="Akhil Jayakumar"
                title="Akhil Jayakumar"
                description="Designer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Thalha Uzair"
                description="FS Developer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Azim Mohammadi"
                description="BE Developer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Yuki Cheng"
                description="PM / FS Developer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Cylvia Lian"
                description="FS Developer"
              ></AboutUsProfile>
              <AboutUsProfile
                src="https://picsum.photos/200"
                alt="image"
                title="Harnoor Kaur"
                description="FS Developer"
              ></AboutUsProfile>
            </div>
          </div>
        </div>
        <div className={styles.abtUs4}>
          <Typography variant="h2-poppins-semibold" color="almost-black">
            <div className={styles.title1}>Contact Us</div>
          </Typography>

          <div className={styles.abtUs4Info}>
            <div>
              <img src={image} alt="" />
            </div>

            <form
              action="https://formsubmit.co/cylvia.lian@gmail.com"
              method="POST"
            >
              <TextInput
                id="name"
                label="Name"
                name="name"
                size="full"
                placeholder="Enter your name"
              />
              <TextInput
                id="email"
                name="email"
                label="E-mail"
                size="full"
                placeholder="Enter your e-mail"
              />
              <div>
                <Typography variant="body2-poppins-medium" color="almost-black">
                  <label htmlFor="message">Message</label>
                </Typography>
                <Typography
                  variant="textfield-poppins-regular"
                  color="small-text-gray"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                  ></textarea>
                </Typography>
              </div>
              <Button label="Submit" variant="yellow" size="dk-sm" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
