import React from "react";
import styles from "./PetCard.module.css";
import Typography from "../Typography/Typography";
import PenSVG from "../SVG/PenSVG";
import CakeSVG from "../SVG/CakeSVG";
import WeightSVG from "../SVG/WeightSVG";
import HeightSVG from "../SVG/HeightSVG";
import PawSVG from "../SVG/PawSVG";
import ArchiveSVG from "../SVG/ArchiveSVG";
import ExportSVG from "../SVG/ExportSVG";
import ExportLog from "../PetExport/ExportLog";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import { useNavigate, Link } from "react-router-dom";

const PetCard = ({ src, petBreed, petAge, petHeight, petWeight,id }) => {

  const navigate = useNavigate();
  const onClickHandler = () => {

    const windowFeatures = "left=100,top=100,width=320,height=320";
const handle = window.open(
  `/exportpetLog/?${id}`,
  "mozillaWindow",
  windowFeatures,
);
    window.open(`/exportpetLog/${id}`);
  //  navigate(`/exportpetLog/?${id}`,{replace: false});
  };

  return (
    <div className={styles.petCardContainer}>
      <div className={styles.imgContainer}>
        <ImageDisplay PetImageData={src}/>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <PawSVG width="41" height="40" />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Breed</Typography>
          <Typography variant="body1-poppins-semibold">{petBreed}</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <CakeSVG width="41" height="46" />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Age</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petAge}</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <HeightSVG width="41" height="43" />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Height</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petHeight} in</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <WeightSVG width="41" height="40" />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Weight</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petWeight} lb</Typography>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <div>
          <PenSVG width="30" height="30" />
          <Typography variant="detailtext2-poppins-medium">edit </Typography>
        </div>
        <div>
          <ArchiveSVG width="30" height="30" />
          <Typography variant="detailtext2-poppins-medium">archive </Typography>
        </div>
        <a href={`/exportpetLog/${id}`} target="_blank" >
          <ExportSVG width="28" height="29" />
          <Typography variant="detailtext2-poppins-medium">
          export
          </Typography>
        </a>
      </div>
    </div>
  );
};

export default PetCard;
