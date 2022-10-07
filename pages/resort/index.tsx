import axios from "axios";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Card from "../../components/pure_elements/Card";
import Pagination from "../../components/pure_elements/Pagination";
import Main from "../../components/ui_layout/Main";
import { resort } from "../../services/resort";

interface ResortArray {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}
interface PageInfoInterface {
  total_page: number;
  total: number;
}
interface ResortsProps {
  resort: Array<ResortArray>;
  total: number;
  total_page: number;
  page_number: number;
}

const Resorts = () => {
  const [resortsData, setResortsData] = useState<Array<ResortArray>>([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [pageInfo, setpageInfo] = useState<PageInfoInterface>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sortData, setSortData] = useState({
    isSortTitle: false,
    isSortPrice: false,
  });

  const handleGetResorts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await resort.get(
        `/resorts?page=${pageNumber}&limit=10&sort_title=${sortData.isSortTitle}&sort_price=${sortData.isSortPrice}`
      );

      setResortsData(res.data.resorts);
      setpageNumber(Number(res.data.page_number));
      setpageInfo({
        total_page: Number(res.data.total_page),
        total: res.data.total,
      });
      setErrorMsg("");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, sortData.isSortPrice, sortData.isSortTitle]);

  useEffect(() => {
    handleGetResorts();
  }, [handleGetResorts]);

  return (
    <div className="resorts-wrapper">
      <div className="resorts-header-title">
        <h1>Best Homes</h1>
      </div>
      <div className="sorting-wrapper">
        <span>sorting :</span>
        <div>
          <button
            className={`sort-item ${sortData.isSortTitle ? "active" : ""}`}
            onClick={() =>
              setSortData((prev) => {
                return { ...prev, isSortTitle: !prev.isSortTitle };
              })
            }
          >
            title
          </button>
          <button
            className={`sort-item ${sortData.isSortPrice ? "active" : ""}`}
            onClick={() =>
              setSortData((prev) => {
                return { ...prev, isSortPrice: !prev.isSortPrice };
              })
            }
          >
            price
          </button>
        </div>
      </div>
      <div className="resorts-cards">
        {errorMsg && <div>{errorMsg}</div>}
        {loading && <div className="loading">loading ....</div>}
        {resortsData ? (
          resortsData.map((item: ResortArray) => (
            <Card
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
            />
          ))
        ) : (
          <div> no data </div>
        )}
      </div>
      <Pagination
        loading={loading}
        pageInfo={pageInfo}
        pageNumber={pageNumber}
        setpageNumber={setpageNumber}
      />
    </div>
  );
};
Resorts.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default Resorts;
