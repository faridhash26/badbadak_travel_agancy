interface PageInfo {
  total: number;
  total_page: number;
}
interface PaginationProps {
  loading: boolean;
  pageInfo?: PageInfo;
  pageNumber: number;
  setpageNumber: (pageNumber: number) => void;
}
const Pagination = ({
  loading,
  pageInfo,
  pageNumber,
  setpageNumber,
}: PaginationProps) => {
  const pageNumberSetGenerator = (totalPages: number) => {
    let numberSet = [];
    for (let i = 1; i <= totalPages; i++) {
      numberSet.push(i);
    }
    return numberSet;
  };
  const handleChangePage = (pageNumber: number) => {
    setpageNumber(pageNumber);
  };

  const handleNextPage = () => {
    if (pageInfo && pageNumber < pageInfo.total_page) {
      setpageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };

  const handleDisableButton = (
    currentPage: number,
    pageNumber: number,
    loading: boolean
  ) => {
    if (loading) {
      return true;
    }
    if (currentPage === pageNumber) {
      return true;
    }
    return false;
  };
  return (
    <div className="pagination-wrapper">
      <button className="prev" onClick={handlePrevPage}>
        prev page
      </button>
      <div className="page-numbers">
        {pageInfo &&
          pageNumberSetGenerator(pageInfo.total_page).map((item) => (
            <button
              className="page-number"
              key={item}
              onClick={() => handleChangePage(item)}
              disabled={handleDisableButton(item, Number(pageNumber), loading)}
            >
              {item}
            </button>
          ))}
      </div>
      <button className="next" onClick={handleNextPage}>
        next page
      </button>
    </div>
  );
};

export default Pagination;
