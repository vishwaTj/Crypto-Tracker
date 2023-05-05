import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/API';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from '@mui/material';
import { chartDays } from "../config/data";
import SelectButton from './SelectButton';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const CoinInfo = ({coin}) => {
  const [historicalData, sethistoricalData] = useState();
  const [days, setDays] = useState(1);

  const {currency} = CryptoState();

  const fetchHistoricData = async () => {
      const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
      
      sethistoricalData(data.prices);
  }

  useEffect(()=>{
    fetchHistoricData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency,days]);

  

  const darkTheme = createTheme({
    palette: {
        primary: {
            main:"#fff",
        },
        type: "dark"
    }
  })

  const newArray = historicalData?.map((coin)=> {
    let date = new Date(coin[0]);
    let time = 
          date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
    return time;      
        }      
          );  
  const data ={
    labels: newArray,
    datasets: [{
      labels: 'Sales of the Week',
      data: historicalData,
      backgroundColor: 'aqua',
      borderColor: 'gold',
      pointBorderColor:'black',
      fill: true
    }]
  }

  const options={
    plugins: {
      legend:true
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <div className='GraphContainer'>
            {/* chart */}
              {
                !historicalData ? (
                    <CircularProgress
                      style={{color: "gold"}}
                      size={250}
                      thickness={1} />
                ): (<>
                     <Line
                        data={{
                          labels: historicalData?.map((coin)=> {
                            let date = new Date(coin[0]);
                            let time = 
                                  date.getHours() > 12
                                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                  : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time: date.toLocaleDateString();       
                        }),
                        datasets: [{
                          data:historicalData?.map((coin)=>coin[1]),
                          label: `Price (Past ${days}) Days in ${currency}`,
                          borderColor: "#EEBC1D"
                        }]
                        }}

                        options={{
                          elements: {
                            point: {
                              radius: 1
                            }
                          }
                        }}
                      />
                      {/* <Line
                        data={data}
                        options = {options}
                      >
                      </Line> */}

                      <div 
                         style={{
                           display: "flex",
                           marginTop: 20,
                           justifyContent: "space-around",
                           width:"100%"
                         }}
                      >
                          {chartDays.map((day) =>(
                            <SelectButton 
                            key={day.value}
                            onClick={()=> setDays(day.value)}
                            selected={day.value === days}
                            >
                              {day.label}
                            </SelectButton>
                          ))}
                      </div>
                  </>
                  )}
  
            {/* buttons */}
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo;