import React from 'react';

function VisitCard({ visit }) {
    return (
        <div className="widecard">
            <div className="compdet">
                <div className="card-heading">
                    <h3>{visit.location}</h3>
                    <span className="date-range">{visit.date}</span>
                </div>
                <h4 className="secondtext">
                    {visit.pastaType} &middot; {visit.sauce} &middot; {visit.protein}
                </h4>
                <p className="summarytext">
                    {visit.bowlsOrdered} bowl{visit.bowlsOrdered === 1 ? '' : 's'} ordered
                    ({visit.pctBowlsConsumed}% consumed) &middot; {visit.breadsticks} breadsticks
                    &middot; soup: {visit.soup} &middot; ${visit.priceNegated} negated &middot; went{' '}
                    {visit.withWho} &middot; recognized by staff {visit.timesRecognized}x
                    {visit.weight != null && <> &middot; weighed in at {visit.weight} lbs</>}
                </p>
            </div>
        </div>
    );
}

export default VisitCard;
