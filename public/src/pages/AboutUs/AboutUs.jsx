import React from 'react'
import Header from '../../components/Header/header';
import styles from '../AboutUs/AboutUs.module.css'
import Typography from '../../components/Typography/Typography';
import Button from '../../components/Button/Button';
import AboutUsContent from '../../components/AboutUsContent/AboutUsContent';

const AboutUs = () => {
    return (
        <div className={styles.AboutUspage}>
            <Header></Header>
            <div className={styles.aboutUsBody}>
                <div className={styles.coverPhoto}>
                    <div className={styles.coverPhotoDescription}>
                        <Typography variant="large-h1-poppins-bold" color="almost-black" >
                            Pawguard Slogan here
                        </Typography>
                        <Typography variant="body2-poppins-medium" color="almost-black">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eveniet dolor, quos inventore aliquam accusantium eaque repellendus quia repudiandae quam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sunt, quas ipsum vel similique earum libero error. Earum, est error!
                        </Typography>
                        <Typography variant="body1-poppins-semibold" color="almost-black">
                            <Button variant="blue-yellow" label="Get Started" size="dk-md" />
                        </Typography>
                    </div>
                </div>
                <div className={styles.aboutUsInformation}>
                    <Typography variant="h2-poppins-semibold" color="almost-black">
                        <div className={styles.title1}>Explore Our System</div>
                    </Typography>
                    <Typography variant="body2-poppins-medium" color="almost-black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus tenetur aspernatur odio est, veniam error illo id nulla animi praesentium in voluptatibus?
                    </Typography>
                    <div className={styles.featureStyles}>
                        <AboutUsContent src="" alt="image" title="Feature 1" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus tenetur aspernatur odio est, veniam error illo id nulla animi praesentium in voluptatibus?">
                        </AboutUsContent>
                        <AboutUsContent src="" alt="image" title="Feature 2" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus tenetur aspernatur odio est, veniam error illo id nulla animi praesentium in voluptatibus?">
                        </AboutUsContent>
                        <AboutUsContent src="" alt="image" title="Feature 3" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, commodi consectetur. Asperiores quibusdam deserunt ipsam nemo natus tenetur aspernatur odio est, veniam error illo id nulla animi praesentium in voluptatibus?">
                        </AboutUsContent>
                    </div>

                    <div className={styles.aboutusProfile}>
                        <div className={styles.aboutUsProfileFirstFour}>
                            <AboutUsContent src="" alt="image" title="profile 1" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 2" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 3" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 4" description="dev/des">
                            </AboutUsContent>
                        </div>
                        <div className={styles.aboutUsProfileremaining}>
                            <AboutUsContent src="" alt="image" title="profile 5" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 6" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 7" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 8" description="dev/des">
                            </AboutUsContent>
                            <AboutUsContent src="" alt="image" title="profile 9s" description="dev/des">
                            </AboutUsContent>
                        </div>
                    </div>

                </div>
                <div className={styles.AboutUsFooter}>
                    <Typography variant="h2-poppins-semibold" color="almost-black">
                        <div className={styles.title1}>Contact Us</div>
                    </Typography>

                    <div>
                        <div></div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
