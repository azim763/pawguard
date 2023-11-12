import React, { useState } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const PetCard = ({ src, petBreed, petAge, petHeight, petWeight, id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleMoreMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMoreMenuOpen(true);
  };

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
    setMoreMenuOpen(false);
  };

  const handleEditClick = () => {
    navigate(`/editPet/${id}`);
    handleMoreMenuClose();
  };

  const handleArchiveClick = () => {
    // Handle archive action
    handleMoreMenuClose();
  };

  const handleExportClick = () => {
    // Handle export action
    window.open(`/exportpetLog/${id}`);
    handleMoreMenuClose();
  };

  return (
    <div className={styles.petCardContainer}>
      <div className={styles.imgContainer}>
        <ImageDisplay PetImageData={src} />
      </div>
      <div className={styles.commonDetailContainer}>
        <div>
          <PawSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionTitle}>
            <Typography variant="textfield-poppins-regular">Breed</Typography>
          </div>
          <Typography variant="body1-poppins-semibold">{petBreed}</Typography>
        </div>

        <div className={styles.mobileCakeSVG}>
          <CakeSVG className={styles.SVGIcons} />
        </div>
        <div className={`${styles.descriptionContainer} ${styles.mobileAge}`}>
          <div className={styles.descriptionTitle}>
            <Typography variant="textfield-poppins-regular">Age</Typography>
          </div>
          <Typography variant="body1-poppins-semibold" color="dark-blue">
            {petAge}
          </Typography>
        </div>

        <div className={styles.mobileHeightSVG}>
          <HeightSVG
            className={styles.SVGIcons}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <div
            className={`${styles.descriptionContainer} ${styles.mobileHeight}`}
          >
            <div className={styles.descriptionTitle}>
              <Typography variant="textfield-poppins-regular">Height</Typography>
            </div>
          </div>
          <Typography variant="body1-poppins-semibold" color="dark-blue">
            {petHeight} in
          </Typography>
        </div>

        <div>
          <WeightSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionTitle}>
            <Typography variant="textfield-poppins-regular">Weight</Typography>
          </div>
          <Typography variant="body1-poppins-semibold" color="dark-blue">
            {petWeight} lb
          </Typography>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <div>
          <PenSVG className={styles.actionSVGIcons} />
          <Typography variant="detailtext2-poppins-medium">Edit </Typography>
        </div>
        <div>
          <ArchiveSVG className={styles.actionSVGIcons} />
          <Typography variant="detailtext2-poppins-medium">Archive </Typography>
        </div>
        <div>
          <ExportSVG
            className={styles.actionSVGIcons}
            onClick={handleExportClick}
          />
          <Typography variant="detailtext2-poppins-medium">Export</Typography>
        </div>
      </div>
      <div className={styles.actionContainerMobile}>
        <IconButton
          aria-controls="more-menu"
          aria-haspopup="true"
          onClick={handleMoreMenuClick}
          style={{padding: "3px"}}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          open={moreMenuOpen}
          onClose={handleMoreMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleArchiveClick}>Archive</MenuItem>
          <MenuItem onClick={handleExportClick}>Export</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default PetCard;
