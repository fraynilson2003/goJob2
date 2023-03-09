import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../containers/pagination/Pagination";
import PlaceAnArrayObjectAtTheBeggining from "../../../helpers/placeAnArrayObjectAtTheBeggining";
import { suggestionServices } from "../../../redux/actions/services/getServices";
import CardSuggestion from "./CardSuggestion";

export default function Suggestions({ detail, totalPages, job, jobName }) {
  //   const tittle = detail.tittle;

  const dispatch = useDispatch();
  // const jobs = detail.Jobs?.map((job) => job.id)[0];
  let suggestions = useSelector((state) => state.suggestionServices.result);

  // Estados de la paginacion
  const [page, setPage] = useState(1);
  let configFilterServicesSuggestion = useSelector(
    (state) => state.configFilterServicesSuggestion
  );

  const paginatePrev = (e) => {
    e.preventDefault();
    // dispatch(cleanAllServices());
    if (page === 1) return;
    setPage(page - 1);
    console.log(e.target.value);
    let newConfig = {
      ...configFilterServicesSuggestion,
      job: job,
      page: page - 1,
    };
    dispatch(suggestionServices(newConfig));
  };
  const paginateNext = (e) => {
    e.preventDefault();
    // dispatch(cleanAllServices());
    if (page === totalPages) return;
    setPage(page + 1);
    let newConfig = {
      ...configFilterServicesSuggestion,
      job: job,
      page: page + 1,
    };
    dispatch(suggestionServices(newConfig));
  };

  const paginate = (e, num) => {
    // e.preventDefault();
    setPage(num);
    // dispatch(cleanAllServices());
    let newConfig = {
      ...configFilterServicesSuggestion,
      job: job,
      page: num,
    };
    dispatch(suggestionServices(newConfig));
  };

  return (
    <>
      <h2 className="text-2xl font-medium m-3">Sugerencias</h2>
      {suggestions?.map((suggestion) => (
        <div className="pb-4">
          <CardSuggestion suggestion={suggestion} id={detail.id} />
        </div>
      ))}
      <div className="p-2">
        <div className="flex justify-center">
          <Pagination
            paginatePrev={paginatePrev}
            paginateNext={paginateNext}
            paginate={paginate}
            totalPages={totalPages}
            page={page}
          />
        </div>
      </div>
    </>
  );
}
