import { useState, useEffect } from 'react';
import { getSalesReport } from '../Services/reportService';

const SalesReport = () => {
  const [report, setReport] = useState({ totalSales: 0, conversionRate: 0 });

  useEffect(() => {
    const fetchReport = async () => {
      const res = await getSalesReport();
      setReport(res.data);
    };
    fetchReport();
  }, []);

  return (
    <div>
      <h2>Sales Report</h2>
      <p>Total Sales: {report.totalSales}</p>
      <p>Conversion Rate: {report.conversionRate}%</p>
    </div>
  );
};

export default SalesReport;
