import Chart from 'react-apexcharts'

const ChartComponent = ({name, serie}) => {
  const options = {
    chart: {
      type: 'pie',
      height: 350
    },
    grid: {
      show: true,
    },
    labels: [`Total usuarios ${name}`],
    colors: ['#810000'],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      formatter: (data, da) => {
        console.log(data, da);
        return da.w.seriesTotals
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
  };

  return (
    <div className="container border my-2 py-2">
      <div className='cointainer rounded-4 py-2 px-3' style={{ backgroundColor: "#CCCCCC" }}>
        <div className='rounded-pill my-2 d-flex justify-content-center' style={{ backgroundColor: "#555555" }}>
          <h5 className='text-white my-2 text-center'>Total usuarios {name}</h5>
        </div>
        <Chart options={options} series={serie} type='pie' height={400} />
      </div>
    </div>
  )
}

export default ChartComponent;