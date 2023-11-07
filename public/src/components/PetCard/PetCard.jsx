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
          <PawSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Breed</Typography>
          <Typography variant="body1-poppins-semibold">{petBreed}</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <CakeSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Age</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petAge}</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <HeightSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Height</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petHeight} in</Typography>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <WeightSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="textfield-poppins-regular">Weight</Typography>
          <Typography variant="body1-poppins-semibold" color="dark-blue">{petWeight} lb</Typography>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <div>
          <PenSVG className={styles.SVGIcons} />
          <Typography variant="detailtext2-poppins-medium">edit </Typography>
        </div>
        <div>
          <ArchiveSVG className={styles.SVGIcons} />
          <Typography variant="detailtext2-poppins-medium">archive </Typography>
        </div>
        <a href={`/exportpetLog/${id}`} target="_blank" >
          <ExportSVG className={styles.SVGIcons} />
          <Typography variant="detailtext2-poppins-medium">
          export
          </Typography>
        </a>
      </div>
    </div>
  );
};

export default PetCard;
