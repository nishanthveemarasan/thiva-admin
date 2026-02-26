import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getList } from "../../store/reducer/serviceReducer";
import { CSpinner } from "@coreui/react";
import { createSelector } from "@reduxjs/toolkit";
import ServiceListTable from "../../components/MyServices/ServiceListTable";
import ARouteButton from "../../components/UI/ARouteButton";
import { useNavigate } from "react-router-dom";
import { serviceStoreActions } from "../../store/store";

const MyServiceList = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getList(setIsLoading));
  }, []);

  const mapStateToProps = createSelector(
    [(state) => state.serviceStore.services],
    (services) => ({
      services,
    })
  );

  const onPageChangeHander = (page) => {
    if (page === null) return;
    console.log(page);
    // dispatch(getList(setIsLoading, page));
  };

  const { services } = useSelector(mapStateToProps);
  let content = (
    <div className="ad-page-spinner">
      <CSpinner color="danger" />
    </div>
  );
  if (!isLoading) {
    content =
      services && services.data.length > 0 ? (
        <ServiceListTable
          header={["#", "Title", "Description", "Action"]}
          tableData={services}
          onChange={onPageChangeHander}
          edit={(row) => {
            dispatch(serviceStoreActions.setSelectedService(row));
            navigate("/services/create");
          }}
          remove={(uuid) => dispatch(deleteService(uuid, navigate))}
        />
      ) : (
        <div className={classes.tableHeading}>
          <div>No Service has been recorded Yet!!</div>
        </div>
      );
  }

  const onRoutePageHandler = () => {
    navigate("/services/create");
  };

  return (
    <>
      <ARouteButton name="Create Service" click={onRoutePageHandler} />
      {content}
    </>
  );
};

export default MyServiceList;
