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
        <div>
          <ExportSVG className={styles.SVGIcons} onClick={handleExportClick} />
          <Typography variant="detailtext2-poppins-medium">
            export
          </Typography>
        </div>
        
      </div>
      <div className={styles.actionContainerMobile}>
          <IconButton
            aria-controls="more-menu"
            aria-haspopup="true"
            onClick={handleMoreMenuClick}
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
