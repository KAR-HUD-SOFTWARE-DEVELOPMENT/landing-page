
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

Chart.register(...registerables);

interface StockData {
    date: string;
    price: number;
}

export const DetailsCompany= () => {
    const NavigateToCompanies = useNavigate()
    const {symbol} = useParams<{ symbol?:string}>();
    const [stockData, setStockData] = useState<StockData[]>([]);

    useEffect(()=>{
        const FetchDataDetails = async()=>{
        console.log(symbol)
        const res = await fetch(`http://localhost:8008/DetailsCompany?symbol=${encodeURIComponent(symbol ?? "")}`);
        const json = await res.json()
        if (json) {
            setStockData(json);
        } else {
            console.error("Błąd pobrania danych firmy");
        }
        }
        FetchDataDetails()
    },[symbol])
    
    const chartData = {
        labels: Object.keys(stockData).map((prop)=>prop),
        datasets: [
            {
                label: 'Companies',
                data: Object.values(stockData).map((val)=> val),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return(
    
    <div>
        <Bar data={chartData} options={options} />
        <button onClick={()=>NavigateToCompanies("/logged")}>Wróć Do listy firm</button>
    </div>
    ) 
};