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
import { deletePetAppointmentByIdRoute } from "../../utils/APIRoutes.js";
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
  onDelete,
  AppointmentId,
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

  // const handleEditClick = () => {
  //   navigate(`/editPet/${id}`);
  //   handleMoreMenuClose();
  // };

  const handleArchiveClick = () => {
    // Handle archive action
    setIsArchiveModalOpen(true);
    // handleMoreMenuClose();
  };

  const handleConfirmArchive = () => {
    // axios
    //   .delete(`${deletePetAppointmentByIdRoute}/${AppointmentId}`)
    //   .then((response) => {
    //     console.log(`Log entry with ID ${AppointmentId} deleted successfully.`);
    //     onDelete();
    //   })
    //   .catch((error) => {
    //     console.error(
    //       `Error deleting log entry with ID ${AppointmentId}:`,
    //       error
    //     );
    //   });
    setIsArchiveModalOpen(false);
  };
  const handleCancelArchive = () => {
    // Close the delete confirmation modal without performing the delete
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
            <Typography variant="body1-poppins-semibold" color="dark-blue">
              {petAge}
            </Typography>
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
            <Typography variant="body1-poppins-semibold" color="dark-blue">
              {petWeight} lb
            </Typography>
          </div>
          <Typography variant="body1-poppins-semibold" color="dark-blue">
            {petWeight} lb
          </Typography>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <NavLink to={`/editPet/${id}`}>
          <PenSVG className={styles.SVGIcons} />
          <Typography variant="detailtext2-poppins-medium">edit </Typography>
        </NavLink>
        <div>
          <ArchiveSVG  className={styles.SVGIcons} onClick={handleArchiveClick} />
          <Typography variant="detailtext2-poppins-medium">archive </Typography>
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
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          open={moreMenuOpen}
          onClose={handleMoreMenuClose}
        >
          <MenuItem>
            {/* <NavLink to={`/editPet/${id}`}>Edit</NavLink> */}
          </MenuItem>
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
