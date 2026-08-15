import React from 'react';
import Widecard from '../components/Widecard';

function Education() {
    return (
        <div className="condiv">
            <p className="eyebrow">Academic background</p>
            <h1 className="section-title">Education</h1>
            <div className="timeline">
                <Widecard
                    title="B.S. Software Engineering"
                    where="University of Wisconsin-Madison"
                    from="August 2017"
                    to="September 2021"
                />
                <Widecard
                    title="PLTW Engineering"
                    where="East Ridge High School"
                    from="2013"
                    to="2017"
                />
            </div>
        </div>
    );
}

export default Education;
