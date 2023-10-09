import React from 'react'
import Typography from '../Typography/Typography'
import styles from '../InsuranceCoverage/InsuranceCoverage.module.css'

const InsuranceCoverage = () => {
    return (
        <div className={styles.InsuranceCoverage}>
            <div className={styles.InsuranceCoverageheaderCovered}>
                <Typography variant="sub-h2-poppins-medium" >
                    What's Covered
                </Typography>
                {/* Add stuff from database */}
            </div>

        </div>
    )
}

export default InsuranceCoverage
