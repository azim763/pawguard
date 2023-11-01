import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/header";
import styles from "../AboutUs/AboutUs.module.css";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import AboutUsFeature from "../../components/AboutUsFeature/AboutUsFeature";
import AboutUsProfile from "../../components/AboutUsProfile/AboutUsProfile";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email sent!");
    // try {
    //   // Send the form data to your server
    //   await axios.post("/send-email", formData);
    //   alert("Email sent successfully!"); // You can customize this message
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   alert("Email sending failed."); // You can customize this message
    // }
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
              Pawguard Slogan here
            </Typography>
            <Typography variant="body2-poppins-medium" color="almost-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              eveniet dolor, quos inventore aliquam accusantium eaque
              repellendus quia repudiandae quam.
            </Typography>
            <Button
              onClick={handleLoginClick}
              variant="blue-yellow"
              label="Get Started"
              size="dk-md"
            />
          </div>
          <div>
            <img src="./../../assets/image-03.webp" alt="" />
          </div>
        </div>
        <div className={styles.abtUs2}>
          <Typography variant="h2-poppins-semibold" color="almost-black">
            <div className={styles.title1}>Explore Our System</div>
          </Typography>
          <Typography variant="body2-poppins-medium" color="almost-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus
            tenetur aspernatur odio est, veniam error illo id nulla animi
            praesentium in voluptatibus?
          </Typography>
          <div className={styles.abtUs2Images}>
            <AboutUsFeature
              src="https://picsum.photos/200"
              alt="image"
              title="Feature 1"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur."
            ></AboutUsFeature>
            <AboutUsFeature
              src="https://picsum.photos/200"
              alt="image"
              title="Feature 2"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur."
            ></AboutUsFeature>
            <AboutUsFeature
              src="https://picsum.photos/200"
              alt="image"
              title="Feature 3"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur."
            ></AboutUsFeature>
          </div>
        </div>

        <div className={styles.abtUs3}>
          <Typography variant="h2-poppins-semibold" color="almost-black">
            <div className={styles.title1}>Our Team</div>
          </Typography>
          <Typography variant="body2-poppins-medium" color="almost-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus
            tenetur aspernatur odio est, veniam error illo id nulla animi
            praesentium in voluptatibus?
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
              src="https://t4.ftcdn.net/jpg/05/80/61/41/360_F_580614175_LW6mydM9ii6KEwPjF8aAlPqmlj21YKiC.jpg"
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
        <div className={styles.abtUs4}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <div className={styles.title1}>Contact Us</div>
        </Typography>

        <div className={styles.abtUs4Info}>
          <div>
            <img src="https://picsum.photos/400" alt="" />
          </div>

          <form onSubmit={handleSubmit}>
            <TextInput id="name" label="Name" size="full" placeholder="Enter your name"/>
            <TextInput id="email" label="E-mail" size="full" placeholder="Enter your e-mail"/>
            <div>
              <Typography variant="body2-poppins-medium" color="almost-black">
                <label htmlFor="message">Message</label>
              </Typography>
              <Typography variant="textfield-poppins-regular" color="small-text-gray">
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
