import React from 'react';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { Container} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

function MakeReservation() {
 const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
      const params =useParams();
console.log(params.property_id);


const handleSubmitClick = (e) => {
    e.preventDefault();
    state.forEach((state) => { 
        console.log(state.startDate)
        console.log(state.endDate)
        fetch(`/reservations/${params.property_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                
            },
            body: JSON.stringify({  // you will get user information from login form
    
                
                "startdate":state.startDate,
                "enddate":state.endDate,
                "username":JSON.parse(localStorage.getItem('username'))
    
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                if (typeof data.token === "undefined") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    });
    
    }

  return (
    <Container>
        
        <DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={state}
  direction="horizontal"
/>;
           <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
                    Book
          </button>
    </Container>
  )
}
export default MakeReservation;