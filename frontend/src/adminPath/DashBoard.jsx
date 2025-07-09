import CurrentActiveUser from '@/dashboardComponent/CurrentActiveUser';
import Revenue from '@/dashboardComponent/Revenue';
import TotalCostumer from '@/dashboardComponent/TotalCostumer';
import TotalSales from '@/dashboardComponent/TotalSales';

const Analysis = ({ setPath }) => {



  return (
    <div className='mt-5'>
      <div className='grid grid-cols-4 gap-2'>
        {/* total revenue of the app*/}
        <div>
          <Revenue />
        </div>
        {/* all the custumer account*/}
        <div>
          <TotalCostumer />
        </div>
        {/* all active custumer account*/}
        <div>
          <CurrentActiveUser />
        </div>
        {/* total sales account*/}
        <div>
          <TotalSales setPath={setPath}/>
        </div>
      </div>
    </div>
  );
};

export default Analysis;