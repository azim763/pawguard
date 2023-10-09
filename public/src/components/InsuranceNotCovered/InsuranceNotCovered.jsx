import React from 'react'
import Typography from '../Typography/Typography'
import styles from '../InsuranceNotCovered/InsuranceNotCovered.module.css'

const InsuranceNotCovered = () => {
  return (
        <div className={styles.InsuranceNotCovered}>
            <div className={styles.InsuranceNotCoveredheader}>
                <Typography variant="sub-h2-poppins-medium" >
                    What's Not Covered
                </Typography>
                {/* Add stuff from database */}
            </div>

        </div>
      
  )
}

export default InsuranceNotCovered
