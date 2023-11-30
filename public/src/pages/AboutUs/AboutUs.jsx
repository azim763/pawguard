import React, { useEffect, useState } from "react";
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
import image from "./../../assets/image-03.png";
import image1 from "./../../assets/aboutus.png";
import member1 from "./../../assets/images/MemberImages/Sanika.png";
import member2 from "./../../assets/images/MemberImages/Cassie.png";
import member3 from "./../../assets/images/MemberImages/Gillian.png";
import member4 from "./../../assets/images/MemberImages/Akhil.png";
import member5 from "./../../assets/images/MemberImages/Thalha.png";
import member6 from "./../../assets/images/MemberImages/Azim.png";
import member7 from "./../../assets/images/MemberImages/Yuki.png";
import member8 from "./../../assets/images/MemberImages/Cylvia.png";
import member9 from "./../../assets/images/MemberImages/Harnoor.png";

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

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );

      if (storedData) {
        navigate("/dashboard");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className={styles.AboutUsPage}>
      <Header />
      <div className={styles.abtUsBody}>
        <div className={styles.abtUs1}>
          <div style={{ maxWidth: "1800px", margin: "auto" }}>
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
        </div>
        <div className={styles.abtUs2}>
          <div style={{ maxWidth: "1220px", margin: "auto" }}>
            <Typography variant="h2-poppins-semibold" color="almost-black">
              <hr />
              <span
                className={styles.title1}
                style={{ backgroundColor: "var(--off-white)" }}
              >
                Explore Our System
              </span>
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              Discover the future of pet care with PetGuard, where a suite of
              intuitive features simplifies every aspect of your pet's health
              and happiness
            </Typography>
            <div className={styles.abtUs2Images}>
              <div>
                <AbtUs2SVG />
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
          <div style={{ maxWidth: "1220px", margin: "auto" }}>
            <Typography variant="h2-poppins-semibold" color="almost-black">
              <hr />
              <span
                className={styles.title1}
                style={{ backgroundColor: "var(--off-white)" }}
              >
                Our Team
              </span>
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              The PetGuard project's success is attributed to our dedicated team
              of UX/UI designers and developers. Our designers created an
              intuitive, visually appealing user experience, while our
              developers brought these designs to life, ensuring a seamless and
              reliable platform. This collaborative effort has simplified pet
              care and made it more accessible to pet owners
            </Typography>
            <div className={styles.abtUs3Images}>
              <AboutUsProfile
                src={member1}
                alt="Sanika Coutinho"
                title="Sanika Coutinho"
                description="Designer"
                linkedinProfile="https://www.linkedin.com/in/sanika-coutinho/"
                linkedinText="/sanika-coutinho"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member2}
                alt="Cassie Hsieh"
                title="Cassie Hsieh"
                description="Designer"
                linkedinProfile="https://www.linkedin.com/in/chia-lin-hsieh/"
                linkedinText="/chia-lin-hsieh"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member3}
                alt="image"
                title="Gillian Kwok"
                description="Designer/ PM"
                linkedinProfile="https://www.linkedin.com/in/gillian-kwok/"
                linkedinText="/gillian-kwok"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member4}
                alt="Akhil Jayakumar"
                title="Akhil Jayakumar"
                description="Designer"
                linkedinProfile="https://www.linkedin.com/in/akhil-jayakumar285/"
                linkedinText="/akhil-jayakumar285"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member5}
                alt="image"
                title="Thalha Uzair"
                description="FS Developer"
                linkedinProfile="https://www.linkedin.com/in/thalha-uzair-122b59169/"
                linkedinText="/thalha-uzair"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member6}
                alt="image"
                title="Azim Mohammadi"
                description="FS Developer"
                linkedinProfile="https://www.linkedin.com/in/azim763/"
                linkedinText="/azim763"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member7}
                alt="image"
                title="Yuki Cheng"
                description="FE Developer/ PM"
                linkedinProfile="https://www.linkedin.com/in/hoi-yan-cheng-a0a886293/"
                linkedinText="/hoi-yan-cheng"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member8}
                alt="image"
                title="Cylvia Lian"
                description="FE Developer"
                linkedinProfile="https://www.linkedin.com/in/cylvialian/"
                linkedinText="/cylvialian"
              ></AboutUsProfile>
              <AboutUsProfile
                src={member9}
                alt="image"
                title="Harnoor Kaur"
                description="FE Developer"
                linkedinProfile="https://www.linkedin.com/in/harnoorkaur1009/"
                linkedinText="/harnoorkaur1009"
              ></AboutUsProfile>
            </div>
          </div>
        </div>
        <div className={styles.abtUs4}>
          <Typography
            variant="h2-poppins-semibold"
            color="almost-black"
            style={{ textAlign: "center", maxWidth: "1220px", margin: "auto" }}
          >
            <hr />
            <span style={{ backgroundColor: "var(--pearl-blue)" }}>
              Contact Us
            </span>
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
