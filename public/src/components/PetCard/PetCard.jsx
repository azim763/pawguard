import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import axios from "axios";
import { archivePetRoute } from "../../utils/APIRoutes.js";
import Button from "../Button/Button";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement("#root");

const PetCard = ({
  src,
  petBreed,
  petAge,
  petHeight,
  petWeight,
  id,
  onArchive,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

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
    setIsArchiveModalOpen(true);
    handleMoreMenuClose();
  };

  const handleConfirmArchive = () => {
    axios
      .patch(`${archivePetRoute}/${id}`)
      .then((response) => {
        console.log(`Pet with ID ${id} has been archived successfully.`);
        onArchive();
      })
      .catch((error) => {
        console.error(
          `Error archiving pet with ID ${id}:`,
          error
        );
      });
    setIsArchiveModalOpen(false);
  };

  const handleCancelArchive = () => {
    setIsArchiveModalOpen(false);
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
          <HeightSVG className={styles.SVGIcons} />
        </div>
        <div className={styles.descriptionContainer}>
          <div
            className={`${styles.descriptionContainer} ${styles.mobileHeight}`}
          >
            <div className={styles.descriptionTitle}>
              <Typography variant="textfield-poppins-regular">
                Height
              </Typography>
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
        <NavLink to={`/editPet/${id}`}>
          <PenSVG className={styles.actionSVGIcons} />
          <Typography variant="detailtext2-poppins-medium">Edit</Typography>
        </NavLink>
        <div onClick={handleArchiveClick}>
          <ArchiveSVG className={styles.actionSVGIcons}/>
          <Typography variant="detailtext2-poppins-medium">Archive</Typography>
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
          style={{ padding: "3px" }}
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

      <Modal
        isOpen={isArchiveModalOpen}
        contentLabel="Delete Confirmation"
        onRequestClose={() => setIsArchiveModalOpen(false)}
        className={modalStyles.modal} // Apply the modal styles
        overlayClassName={modalStyles.overlay} // You can also style the overlay
      >
        <Typography variant="sub-poppins-medium">Archive Pet</Typography>
        <hr></hr>
        <Typography variant="body2-poppins-medium">
          This pet will be archived.
        </Typography>
        <div className={modalStyles.CardButtonGroup}>
          <Button
            variant="cancel-btn"
            size="dk-md-s"
            onClick={handleCancelArchive}
          >
            Cancel
          </Button>
          <Button
            variant="yellow"
            size="dk-md-s"
            onClick={handleConfirmArchive}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PetCard;
