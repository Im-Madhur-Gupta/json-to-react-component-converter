import { useState } from 'react';

import Card1 from './Card1';
import Card2 from './Card2';

const Caraousel = ({}) => {
    const [leftCardIndex, setLeftCardIndex] = useState(1);

    const cardDeatilsArr = [1, 2, 3];

    return (
        <div className="main-cont">
            <Card1 />
            <Card2 cardTitle={cardTitle} cardModalDetails={cardModalDetails} />
        </div>
    );
};

export default Caraousel;
