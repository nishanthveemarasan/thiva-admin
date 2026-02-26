import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getList } from "../../store/reducer/serviceReducer";
import { CSpinner } from "@coreui/react";
import { createSelector } from "@reduxjs/toolkit";
import ServiceListTable from "../../components/MyServices/ServiceListTable";
import ARouteButton from "../../components/UI/ARouteButton";
import { useNavigate } from "react-router-dom";
import { serviceStoreActions } from "../../store/store";
import classes from "../home/Home.module.css";

const MyServiceList = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapStateToProps = createSelector(
    [
      (state) => state.serviceStore.services,
      (state) => state.serviceStore.refresh,
    ],
    (services, refresh) => ({
      services,refresh
    })
  );
  const { services, refresh } = useSelector(mapStateToProps);
  useEffect(() => {
    dispatch(getList(setIsLoading));
  }, [refresh]);


  const onPageChangeHander = (page) => {
    if (page === null) return;
    dispatch(getList(setIsLoading, page));
  };

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
            navigate(`/services/update/${row.uuid}`);
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
