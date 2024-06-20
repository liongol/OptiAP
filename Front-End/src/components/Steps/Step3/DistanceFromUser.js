import '../step.css';
import React from 'react';

const DistanceFromUser =(props)=>
{
    return (
        <div>
            <form>
                <label>
                    Distance (in meters):
                    <input
                        type="number"
                        value={props.distance}
                        onChange={(e) => props.setDistance(e.target.value)}
                    />
                </label>
            </form>
        </div>
    );
}

export default DistanceFromUser;