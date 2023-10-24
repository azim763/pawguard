import React from 'react';
import styles from './FoodForm.module.css'; // Import your styles
import TextInput from '../../TextInput/TextInput';
import Dropdown from '../../Dropdown/Dropdown';
import Typography from '../../Typography/Typography';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';
// Import your Button component

const FoodForm = ({ handleSubmit, handleChange }) => {
    const MealPerDay = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
    ];

    return (
        <div>
            <div className={styles.petLogFood}>
                <TextInput
                    id="foodName"
                    htmlFor="foodName"
                    name="foodName"
                    label="Food Name"
                    onChange={(e) => handleChange(e)}
                />
                <div className={styles.petLogFoodAndQuantity}>
                    <Dropdown
                        label="Meals per Day"
                        id="MealPerDay"
                        options={MealPerDay}
                    />
                    <div className={styles.quantityPerMeal}>
                        <TextInput id="quantity" label="Quantity Per Meal" placeholder="Eg: 500" />
                        <Typography variant="body2-poppins-medium">g</Typography>
                    </div>
                </div>
            </div>
            <div className={styles.petLogCheckBox}>
                <Checkbox id="kibble" label="kibble" value="kibble" />
                <Checkbox id="canned" label="canned" value="canned" />
                <Checkbox id="semiMoist" label="Semi-Moist" value="semiMoist" />
                <Checkbox id="homeCooked" label="Home-Cooked" value="homeCooked" />
                <Checkbox id="raw" label="Raw" value="raw" />
            </div>
            <Button
                variant="yellow"
                label="Add Food"
                size="dk-md-s"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default FoodForm;
