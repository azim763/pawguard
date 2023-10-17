import React from "react";
import Header from "../../components/Header/header";
import styles from "../AboutUs/AboutUs.module.css";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import AboutUsFeature from "../../components/AboutUsFeature/AboutUsFeature";
import AboutUsProfile from "../../components/AboutUsProfile/AboutUsProfile";

const AboutUs = () => {
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
            <Button variant="blue-yellow" label="Get Started" size="dk-md" />
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
          <div className={styles.abtUs3Images1}>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 1"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 2"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 3"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 4"
              description="dev/des"
            ></AboutUsProfile>
          </div>
          <div className={styles.abtUs3Images2}>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 5"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 6"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 7"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 8"
              description="dev/des"
            ></AboutUsProfile>
            <AboutUsProfile
              src="https://picsum.photos/200"
              alt="image"
              title="profile 9s"
              description="dev/des"
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
            <img src="https://picsum.photos/400" alt="" />
          </div>

          <div>
            <TextInput label="Name" />
            <TextInput label="E-mail" />
            <TextInput label="Message" />
            <Button label="Submit" variant="yellow" size="dk-md-s" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
